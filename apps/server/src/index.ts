import rateLimiter from "@/lib/rate-limiter";
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

app.use("*", async (c, next) => {
	try {
		const key =
			c.req.header("x-forwarded-for") ||
			c.req.raw.headers.get("cf-connecting-ip") ||
			c.req.raw.headers.get("x-real-ip") ||
			c.req.raw.headers.get("host") ||
			"unknown";
		await rateLimiter.consume(key); // IP-based or user ID, etc.
		return await next();
	} catch (err) {
		console.error(err);
		return c.text("Too Many Requests", 429);
	}
});

app.get("/kamehame", c => c.text("HAAAAAAAAAAAAAA"));

app.route("/api", routes);

export default {
	port: 1284,
	fetch: app.fetch,
};
