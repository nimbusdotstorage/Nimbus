import { Hono } from "hono";
import { auth } from "@/packages/auth/src/auth";
import { cors } from "hono/cors";
import { GoogleDriveManager } from "lib/google-drive";

const app = new Hono();

app.use(cors());

app.on(["POST", "GET"], "/api/auth/*", c => {
	return auth.handler(c.req.raw);
});

app.get("/", c => c.text("Nimbus is flying! The server is running on port 1284"));

export default {
	port: 1284,
	fetch: app.fetch,
};
