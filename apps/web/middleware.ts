import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	if (pathname.startsWith("/app")) {
		const sessionCookie = getSessionCookie(request);
		if (!sessionCookie) {
			return NextResponse.redirect(new URL("/", request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/app"],
};
