import { ErrorResponse, getServerErrorResponse } from "@/utils/response-classes/error-response";
import { SuccessResponse } from "@/utils/response-classes/success-response";
import { getIp, setRateLimitHeaders } from "@/utils/rate-limiter-utils";
import { SUCCESS_MESSAGES } from "@/utils/constants/success-message";
import { ERROR_MESSAGES } from "@/utils/constants/error-message";
import { SUCCESS_CODES } from "@/utils/constants/success-code";
import { waitlistRateLimiter } from "@/config/rate-limiters";
import { ERROR_CODES } from "@/utils/constants/error-code";
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
					code: ERROR_CODES.TO_MANY_REQUESTS,
					message: ERROR_MESSAGES.TO_MANY_REQUESTS,
				}),
				403
			);
		}
		return c.json(getServerErrorResponse(), 500);
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
			return c.json(
				new ErrorResponse({
					code: ERROR_CODES.DUPLICATE_EMAIL,
					message: ERROR_MESSAGES.WAITLIST_DUPLICATE_EMAIL,
				}),
				400
			);
		}

		await db.insert(waitlist).values({
			id: nanoid(),
			email: email.toLowerCase().trim(),
		});

		return c.json(
			new SuccessResponse({
				code: SUCCESS_CODES.WAITLIST_ADDED,
				message: SUCCESS_MESSAGES.WAITLIST_ADDED,
				data: null,
			}),
			201
		);
	} catch (error) {
		console.error("Error adding email to waitlist:", error);
		return c.json(getServerErrorResponse(), 500);
	}
});

waitlistRouter.get("/count", async c => {
	try {
		const result = await db.select({ count: count() }).from(waitlist);
		return c.json(
			new SuccessResponse({
				code: SUCCESS_CODES.WAITLIST_COUNT,
				message: SUCCESS_MESSAGES.WAITLIST_COUNT,
				data: { count: result[0]?.count || 0 },
			})
		);
	} catch (error) {
		console.error("Error getting waitlist count:", error);
		return c.json(getServerErrorResponse(), 500);
	}
});

export default waitlistRouter;
