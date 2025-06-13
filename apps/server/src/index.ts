import { RedisStore, type RedisReply } from "rate-limit-redis";
import { rateLimiter } from "hono-rate-limiter";
import { type Store } from "hono-rate-limiter";
import valkeyClient from "@/config/valkey";
import type { Command } from "iovalkey";
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

const limiter = rateLimiter({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	standardHeaders: "draft-7",
	keyGenerator: c => c.req.header("X-Forwarded-for") + "requestId",
	store: new RedisStore({
		sendCommand: (...args) => valkeyClient.sendCommand(args as unknown as Command) as Promise<RedisReply>,
	}) as unknown as Store,
});

app.use(limiter);

app.get("/kamehame", c => c.text("HAAAAAAAAAAAAAA"));

app.route("/api", routes);

export default {
	port: 1284,
	fetch: app.fetch,
};
