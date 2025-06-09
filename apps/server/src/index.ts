import { Hono } from "hono";
import { cors } from "hono/cors";
import routes from "./routes";

const app = new Hono();

app.use(
	cors({
		origin: process.env.FRONTEND_URL!,
		credentials: true,
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	})
);

app.get("/healthcheck", c => c.text("Everything is working!"));

app.route("/api", routes);

export default {
	port: 1284,
	fetch: app.fetch,
};
