import { Hono } from "hono";
import { auth } from "@/packages/auth/src/auth";
import { cors } from "hono/cors";

const app = new Hono();

app.use(
	cors({
		origin: process.env.FRONTEND_URL!,
		credentials: true,
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	})
);

app.on(["POST", "GET"], "/api/auth/*", async c => {
	try {
		return await auth.handler(c.req.raw);
	} catch (error: any) {
		console.error("Auth handler error:", error);
		return c.json({ error: "Internal server error", details: error.message }, 500);
	}
});

app.get("/", c => c.text("Nimbus is flying! The server is running on port 1284"));

export default {
	port: 1284,
	fetch: app.fetch,
};
