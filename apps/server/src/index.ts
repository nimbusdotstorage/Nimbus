import { Hono } from "hono";
import { cors } from "hono/cors";
import filesRoutes from "./routes/files";
import auth from "./routes/auth";

const app = new Hono();

app.use(
	cors({
		origin: process.env.FRONTEND_URL!,
		credentials: true,
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	})
);

// Health check
app.get("/ka-me-ha-me", c => c.text("HAAAAAAAAAAAAAA"));

app.route("/files", filesRoutes);
app.route("/api/auth", auth);

export default {
	port: 1284,
	fetch: app.fetch,
};
