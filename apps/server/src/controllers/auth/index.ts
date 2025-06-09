import { user } from "@repo/db/schema";
import { auth } from "@repo/auth/auth";
import type { Context } from "hono";
import { eq } from "drizzle-orm";
import { db } from "@repo/db";

export const checkEmail = async (c: Context) => {
	try {
		const { email } = await c.req.json();

		const existingUser = await db
			.select({ id: user.id })
			.from(user)
			.where(eq(user.email, email.toLowerCase().trim()))
			.limit(1);

		return c.json({ exists: existingUser.length > 0 });
	} catch (error) {
		console.error("Error checking email:", error);
		return c.json({ error: "Internal server error" }, 500);
	}
};

export const handleAuth = async (c: Context) => {
	try {
		return await auth.handler(c.req.raw);
	} catch (error) {
		console.error("Auth handler error:", error);
		return c.json({ error: "Authentication failed" }, 500);
	}
};
