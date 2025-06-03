import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/packages/db/src/index";
import { waitlist } from "@/packages/db/schema";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";

// Simple in-memory rate limiter
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting function
function checkRateLimit(ip: string, limit: number = 3, windowMs: number = 60000) {
	const now = Date.now();
	const record = rateLimitStore.get(ip);

	if (!record || now > record.resetTime) {
		// First request or window expired
		rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
		return { allowed: true, remaining: limit - 1, resetTime: now + windowMs };
	}

	if (record.count >= limit) {
		return { allowed: false, remaining: 0, resetTime: record.resetTime };
	}

	// Increment counter
	record.count++;
	return { allowed: true, remaining: limit - record.count, resetTime: record.resetTime };
}

// Clean up expired entries periodically
setInterval(() => {
	const now = Date.now();
	for (const [key, value] of rateLimitStore.entries()) {
		if (now > value.resetTime) {
			rateLimitStore.delete(key);
		}
	}
}, 60000); // Clean up every minute

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
		}, "Email domain or TLD is not allowed"),
});

// POST /api/waitlist/join - Add email to waitlist
export async function POST(request: Request) {
	try {
		const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "anonymous";

		// Check rate limit (3 requests per 1 minute)
		const rateLimit = checkRateLimit(ip, 3, 60000);

		if (!rateLimit.allowed) {
			return NextResponse.json(
				{
					success: false,
					error: "Too many requests. Please wait before trying again.",
					retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000),
				},
				{
					status: 429,
				}
			);
		}

		const body = await request.json();
		const result = emailSchema.safeParse(body);

		if (!result.success) {
			return NextResponse.json({ success: false, error: result.error.format() }, { status: 400 });
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
