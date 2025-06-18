import { ErrorResponse, getServerErrorResponse } from "./utils/response-classes/error-response";
import { loggedInUserRateLimiter, anonymousUserRateLimiter } from "@/config/rate-limiters";
import { getIp, setRateLimitHeaders } from "./utils/rate-limiter-utils";
import { ERROR_MESSAGES } from "./utils/constants/error-message";
import { ERROR_CODES } from "./utils/constants/error-code";
import { RateLimiterRes } from "rate-limiter-flexible";
import { auth, type Session } from "@nimbus/auth/auth";
import { db, type DB } from "@nimbus/db";
import { logger } from "hono/logger";
import { env } from "@/config/env";
import { cors } from "hono/cors";
import routes from "@/routes";
import { Hono } from "hono";

export type RequestVariables = {
	db: DB;
	user?: Session["user"];
	session?: Session["session"];
};

const app = new Hono<{ Variables: RequestVariables }>();

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
	c.set("db", db);
	c.set("user", session?.user);
	c.set("session", session?.session);
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
					code: ERROR_CODES.TO_MANY_REQUESTS,
					message: ERROR_MESSAGES.TO_MANY_REQUESTS,
				}),
				429
			);
		}
		return c.json(getServerErrorResponse(), 500);
	}
});

app.get("/kamehame", c => c.text("HAAAAAAAAAAAAAA"));

app.route("/api", routes);

export default {
	port: 1284,
	fetch: app.fetch,
};
