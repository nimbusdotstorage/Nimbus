import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import RateLimiter from "next-rate-limit";

// @ts-ignore
const limiter = new RateLimiter({
	interval: 60 * 5000, 
	uniqueTokenPerInterval: 500,
});

export async function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	// Apply strict rate limiting to all waitlist API routes
	if (pathname.startsWith("/api/waitlist")) {
		const ip = request.ip || request.headers.get("x-forwarded-for") || "anonymous";

		try {
			await limiter.check(5, `waitlist:${ip}`);
		} catch (error) {
			return new NextResponse(
				JSON.stringify({
					error: "Rate limit exceeded",
					message: "You've hit your limit for requests. Please wait before trying again.",
				}),
				{
					status: 429,
					headers: {
						"Content-Type": "application/json",
						"X-RateLimit-Limit": "5",
						"X-RateLimit-Remaining": "0",
						"Retry-After": "300",
					},
				}
			);
		}
	}

	if (pathname.startsWith("/app")) {
		const sessionCookie = getSessionCookie(request);
		if (!sessionCookie) {
			return NextResponse.redirect(new URL("/", request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/app", "/api/waitlist/:path*"],
};
