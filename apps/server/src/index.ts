import { logger } from "hono/logger";
import { cors } from "hono/cors";
import routes from "./routes";
import { Hono } from "hono";
import { FRONTEND_URL } from "@repo/auth/constants";

const app = new Hono();

app.use(
	cors({
		origin: FRONTEND_URL,
		credentials: true,
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	})
);
app.use(logger());

app.get("/healthcheck", c => c.text("Everything is working!"));

app.route("/api", routes);

export default {
	port: 1284,
	fetch: app.fetch,
};
