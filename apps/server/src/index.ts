import { logger } from "hono/logger";
import { env } from "@/config/env";
import { cors } from "hono/cors";
import routes from "@/routes";
import { Hono } from "hono";

const app = new Hono();

app.use(
	cors({
		origin: env.FRONTEND_URL,
		credentials: true,
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	})
);
app.use(logger());

app.get("/kamehame", c => c.text("HAAAAAAAAAAAAAA"));

app.route("/api", routes);

export default {
	port: 1284,
	fetch: app.fetch,
};
