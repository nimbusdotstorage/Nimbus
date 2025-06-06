import { auth } from "@/packages/auth/src/auth";
import { Hono } from "hono";

const app = new Hono();

app.on(["POST", "GET"], "/*", async c => {
	try {
		return await auth.handler(c.req.raw);
	} catch (error: any) {
		console.error("Auth handler error:", error);
		return c.json({ error: "Authentication failed" }, 500);
	}
});

export default app;
