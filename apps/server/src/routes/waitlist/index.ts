import { rateLimitAttempts, waitlist } from "@nimbus/db/schema";
import { zValidator } from "@hono/zod-validator";
import { emailSchema } from "@/validators";
import { eq, sql } from "drizzle-orm";
import { count } from "drizzle-orm";
import type { Context } from "hono";
import { db } from "@nimbus/db";
import { nanoid } from "nanoid";
import { Hono } from "hono";

const waitlistRouter = new Hono();

// Database-backed rate limiting function. Replace with Valkey rate limiting
async function checkRateLimitDB(ip: string, limit = 3, windowMs = 120000) {
	const now = new Date();

	const attempts = await db.select().from(rateLimitAttempts).where(eq(rateLimitAttempts.identifier, ip)).limit(1);

	const currentAttempt = attempts[0];

	if (!currentAttempt || currentAttempt.expiresAt < now) {
		const newExpiry = new Date(now.getTime() + windowMs);
		await db
			.insert(rateLimitAttempts)
			.values({ identifier: ip, count: 1, expiresAt: newExpiry })
			.onConflictDoUpdate({
				target: rateLimitAttempts.identifier,
				set: { count: 1, expiresAt: newExpiry },
			});
		return { allowed: true, remaining: limit - 1, resetTime: newExpiry };
	}

	if (currentAttempt.count >= limit) {
		return { allowed: false, remaining: 0, resetTime: currentAttempt.expiresAt };
	}

	await db
		.update(rateLimitAttempts)
		.set({ count: sql`${rateLimitAttempts.count} + 1` })
		.where(eq(rateLimitAttempts.identifier, ip));

	return { allowed: true, remaining: limit - (currentAttempt.count + 1), resetTime: currentAttempt.expiresAt };
}

// Route: POST /waitlist/join
waitlistRouter.post("/join", zValidator("json", emailSchema), async (c: Context) => {
	try {
		const ip = c.req.header("x-forwarded-for") || c.req.header("x-real-ip") || "anonymous";

		const rateLimitResult = await checkRateLimitDB(ip, 3, 120000);

		if (!rateLimitResult.allowed) {
			return c.json(
				{
					success: false,
					error: "Too many requests. Please wait before trying again.",
					retryAfter: Math.ceil((rateLimitResult.resetTime.getTime() - Date.now()) / 1000),
				},
				429
			);
		}

		const email = (await c.req.json()).email;

		const existing = await db
			.select()
			.from(waitlist)
			.where(eq(waitlist.email, email.toLowerCase().trim()))
			.limit(1)
			.then(rows => rows[0]);

		if (existing) {
			return c.json({ success: false, error: "This email is already on the waitlist" }, 400);
		}

		await db.insert(waitlist).values({
			id: nanoid(),
			email: email.toLowerCase().trim(),
		});

		return c.json({ success: true }, 201);
	} catch (error) {
		console.error("Error adding email to waitlist:", error);
		return c.json({ success: false, error: "Internal server error" }, 500);
	}
});

waitlistRouter.get("/count", async c => {
	try {
		const result = await db.select({ count: count() }).from(waitlist);
		return c.json({ count: result[0]?.count || 0 });
	} catch (error) {
		console.error("Error getting waitlist count:", error);
		return c.json({ success: false, error: "Internal server error" }, 500);
	}
});

export default waitlistRouter;
