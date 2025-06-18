import { loggedInUserRateLimiter, anonymousUserRateLimiter } from "@/config/rate-limiters";
import { ErrorResponse } from "./utils/response-classes/error-response";
import { getIp, setRateLimitHeaders } from "./utils/rate-limiter-utils";
import { RateLimiterRes } from "rate-limiter-flexible";
import { auth } from "@nimbus/auth/auth";
import { logger } from "hono/logger";
import { env } from "@/config/env";
import { cors } from "hono/cors";
import { db } from "@nimbus/db";
import routes from "@/routes";
import { Hono } from "hono";

export type ReqVariables = {
	user: typeof auth.$Infer.Session.user | null;
	session: typeof auth.$Infer.Session.session | null;
	db: typeof db | null;
};

const app = new Hono<{ Variables: ReqVariables }>();

app.use(logger());
app.use(
	cors({
		origin: env.FRONTEND_URL,
		credentials: true,
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	})
);

app.use("*", async (c, next) => {
	const session = await auth.api.getSession({ headers: c.req.raw.headers });

	// TODO: Add auth middleware and ratelimiting to the drive operations endpoints.
	if (!session) {
		c.set("db", null);
		c.set("user", null);
		c.set("session", null);
		// return c.json({ error: "Unauthorized" }, 401);
		return next();
	}

	c.set("db", db);
	c.set("user", session.user);
	c.set("session", session.session);
	return next();
});

app.use("*", async (c, next) => {
	const user = c.get("user");
	try {
		let rateLimiterRes: RateLimiterRes;
		if (user) {
			rateLimiterRes = await loggedInUserRateLimiter.consume(user.id);
			setRateLimitHeaders(c, rateLimiterRes, loggedInUserRateLimiter);
		} else {
			rateLimiterRes = await anonymousUserRateLimiter.consume(getIp(c));
			setRateLimitHeaders(c, rateLimiterRes, anonymousUserRateLimiter);
		}
		return await next();
	} catch (err) {
		console.error("Error in rate limiter middleware:", err);
		if (err instanceof RateLimiterRes) {
			if (user) {
				setRateLimitHeaders(c, err, loggedInUserRateLimiter);
			} else {
				setRateLimitHeaders(c, err, anonymousUserRateLimiter);
			}
			return c.json(
				new ErrorResponse({
					code: "TOO_MANY_REQUESTS",
					message: "Too many requests. Please wait before trying again.",
				}),
				403
			);
		}
		return c.json(new ErrorResponse({ code: "INTERNAL_SERVER_ERROR", message: "Internal server error." }), 500);
	}
});

app.get("/kamehame", c => c.text("HAAAAAAAAAAAAAA"));

app.route("/api", routes);

export default {
	port: 1284,
	fetch: app.fetch,
};
