import { db } from "@repo/db";
import { rateLimitAttempts, waitlist } from "@repo/db/schema";
import { eq, sql } from "drizzle-orm";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Database-backed rate limiting function
async function checkRateLimitDB(ip: string, limit: number = 3, windowMs: number = 120000) {
	const now = new Date();

	const attempts = await db.select().from(rateLimitAttempts).where(eq(rateLimitAttempts.identifier, ip)).limit(1);

	let currentAttempt = attempts[0];

	if (!currentAttempt || currentAttempt.expiresAt < now) {
		// No record, or record expired, create/reset it
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

	// Increment counter
	await db
		.update(rateLimitAttempts)
		.set({ count: sql`${rateLimitAttempts.count} + 1` })
		.where(eq(rateLimitAttempts.identifier, ip));

	return { allowed: true, remaining: limit - (currentAttempt.count + 1), resetTime: currentAttempt.expiresAt };
}

// List of allowed email domains
const ALLOWED_DOMAINS = ["gmail.com", "outlook.com", "yahoo.com", "proton.me"];

// Email validation schema
const emailSchema = z.object({
	email: z
		.string()
		.email("Please enter a valid email address")
		.refine(email => {
			const [, domain] = email.split("@");
			if (!domain) return false;

			// Allowed domains check
			const allowed = ALLOWED_DOMAINS.some(allowed => domain === allowed || domain.endsWith(`.${allowed}`));
			if (!allowed) return false;

			// TLD and label checks
			const labels = domain.split(".");
			if (labels.length < 2 || labels.length > 3) return false;
			const tld = labels.at(-1)!;
			return /^[a-z]{2,63}$/i.test(tld);
		}, "Invalid email, please try again"),
});

// POST /api/waitlist/join - Add email to waitlist
export async function POST(request: NextRequest) {
	try {
		const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "anonymous";

		// Check rate limit (3 requests per 2 minutes)
		const rateLimitResult = await checkRateLimitDB(ip, 3, 120000);

		if (!rateLimitResult.allowed) {
			return NextResponse.json(
				{
					success: false,
					error: "Too many requests. Please wait before trying again.",
					retryAfter: Math.ceil((rateLimitResult.resetTime.getTime() - Date.now()) / 1000),
				},
				{
					status: 429,
				}
			);
		}

		const body = await request.json();
		const result = emailSchema.safeParse(body);

		if (!result.success) {
			// Handle Zod error
			const errorMessage = result.error.errors[0]?.message;
			return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
		}

		const { email } = result.data;

		// Check if email already exists
		const existingEmail = await db
			.select()
			.from(waitlist)
			.where(eq(waitlist.email, email.toLowerCase().trim()))
			.limit(1)
			.then(rows => rows[0]);

		if (existingEmail) {
			return NextResponse.json({ success: false, error: "This email is already on the waitlist" }, { status: 400 });
		}

		// Insert email into waitlist table
		await db.insert(waitlist).values({
			id: nanoid(),
			email: email.toLowerCase().trim(),
		});

		// Add rate limit headers to successful response
		const response = NextResponse.json({ success: true }, { status: 201 });

		return response;
	} catch (error) {
		console.error("Error adding email to waitlist:", error);
		return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
	}
}
