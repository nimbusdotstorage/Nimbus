import { Hono } from "hono";
import { cors } from "hono/cors";
import { db } from "@/packages/db/src/index";
import { auth } from "@/packages/auth/src/auth";
import filesRoutes from "@/apps/server/src/routes/files";
import authRoutes from "@/apps/server/src/routes/auth";
import waitlistRoutes from "@/apps/server/src/routes/waitlist";
import type { SessionUser } from "@/apps/server/lib/utils/accounts";

export type ReqVariables = {
	user: SessionUser;
	db: typeof db;
};

const app = new Hono<{ Variables: ReqVariables }>();

app.use(
	cors({
		origin: process.env.FRONTEND_URL!,
		credentials: true,
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	})
);

app.use("*", async (c, next) => {
	c.set("db", db);
	const session = await auth.api.getSession({ headers: c.req.raw.headers });
	c.set("user", session?.user);
	await next();
});

// Health check
app.get("/kamehame", c => c.text("HAAAAAAAAAAAAAA"));

app.route("/files", filesRoutes);
app.route("/api/auth", authRoutes);
app.route("/waitlist", waitlistRoutes);

export default {
	port: 1284,
	fetch: app.fetch,
};
