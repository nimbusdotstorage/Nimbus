import { Hono } from "hono";
import { cors } from "hono/cors";
import filesRoutes from "./routes/files";
import authRoutes from "./routes/auth";
import waitlistRoutes from "./routes/waitlist";
import { auth } from "@/packages/auth/src/auth";

const app = new Hono<{
	Variables: { user: typeof auth.$Infer.Session.user | null; session: typeof auth.$Infer.Session.session | null };
}>();

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

	if (!session) {
		c.set("user", null);
		c.set("session", null);
		return next();
	}

	c.set("user", session.user);
	c.set("session", session.session);
	return next();
});

// Health check
app.get("/ka-me-ha-me", c => c.text("HAAAAAAAAAAAAAA"));

app.route("/files", filesRoutes);
app.route("/api/auth", authRoutes);
app.route("/waitlist", waitlistRoutes);

export default {
	port: 1284,
	fetch: app.fetch,
};
