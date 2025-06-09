import { Hono } from "hono";
import { cors } from "hono/cors";
import filesRoutes from "@/apps/server/src/routes/files";
import authRoutes from "@/apps/server/src/routes/auth";
import waitlistRoutes from "@/apps/server/src/routes/waitlist";
import { env } from "@/src/config/env";

const app = new Hono();

app.use(
	cors({
		origin: env.FRONTEND_URL,
		credentials: true,
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	})
);

// Health check
app.get("/kamehame", c => c.text("HAAAAAAAAAAAAAA"));

app.route("/files", filesRoutes);
app.route("/api/auth", authRoutes);
app.route("/waitlist", waitlistRoutes);

export default {
	port: 1284,
	fetch: app.fetch,
};
