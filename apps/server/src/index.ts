// import { FRONTEND_URL } from "@repo/auth/constants";
import { auth } from "@repo/auth/auth";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { db } from "@repo/db";
import routes from "./routes";
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
		origin: process.env.FRONTEND_URL!,
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

app.get("/kamehame", c => c.text("HAAAAAAAAAAAAAA"));

app.route("/api", routes);

export default {
	port: 1284,
	fetch: app.fetch,
};
