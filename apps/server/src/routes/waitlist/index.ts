import { ErrorResponse } from "@/utils/response-classes/error-response";
import { getIp, setRateLimitHeaders } from "@/utils/rate-limiter-utils";
import { waitlistRateLimiter } from "@/config/rate-limiters";
import { RateLimiterRes } from "rate-limiter-flexible";
import { zValidator } from "@hono/zod-validator";
import { waitlist } from "@nimbus/db/schema";
import { emailSchema } from "@/validators";
import type { Context, Next } from "hono";
import { count } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { db } from "@nimbus/db";
import { nanoid } from "nanoid";
import { Hono } from "hono";

const waitlistRouter = new Hono();

const rateLimiter = async (c: Context, next: Next) => {
	try {
		const key = getIp(c);
		const rateLimiterRes = await waitlistRateLimiter.consume(key);
		setRateLimitHeaders(c, rateLimiterRes, waitlistRateLimiter);
		return next();
	} catch (err) {
		console.error("Waitlist rate limiter error:", err);

		if (err instanceof RateLimiterRes) {
			setRateLimitHeaders(c, err, waitlistRateLimiter);
			return c.json(
				new ErrorResponse({
					code: "TOO_MANY_REQUESTS",
					message: "Too many requests. Please wait before trying again.",
				}),
				403
			);
		}

		return c.json(new ErrorResponse({ code: "INTERNAL_SERVER_ERROR", message: "Internal server error." }), 500);
	}
};

// Route: POST /waitlist/join
waitlistRouter.post("/join", zValidator("json", emailSchema), rateLimiter, async (c: Context) => {
	try {
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
		console.log("OK");
		const result = await db.select({ count: count() }).from(waitlist);
		return c.json({ count: result[0]?.count || 0 });
	} catch (error) {
		console.error("Error getting waitlist count:", error);
		return c.json({ success: false, error: "Internal server error" }, 500);
	}
});

export default waitlistRouter;
