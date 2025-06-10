import { getSessionCookie } from "better-auth/cookies";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = ["/app"];
const publicRoutes = ["/", "/signin", "/signup", "/forgot-password", "/reset-password"];

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

	if (isProtectedRoute) {
		try {
			const sessionCookie = await getSessionCookie(request.headers);

			if (!sessionCookie) {
				const signInUrl = new URL("/signin", request.url);
				signInUrl.searchParams.set("redirect", pathname);
				return NextResponse.redirect(signInUrl);
			}

			return NextResponse.next();
		} catch (error) {
			console.error("Auth middleware error:", error);
			const signInUrl = new URL("/signin", request.url);
			signInUrl.searchParams.set("redirect", pathname);
			return NextResponse.redirect(signInUrl);
		}
	}

	const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route));

	// If user is authenticated and trying to access auth pages, redirect to app
	if (isPublicRoute && pathname !== "/") {
		if (
			pathname === "/signin" ||
			pathname === "/signup" ||
			pathname === "/forgot-password" ||
			pathname === "/reset-password"
		) {
			try {
				const sessionCookie = await getSessionCookie(request.headers);

				if (sessionCookie) {
					return NextResponse.redirect(new URL("/app", request.url));
				}
			} catch (error) {
				console.error("Auth check error:", error);
				return NextResponse.redirect(new URL("/signin", request.url));
			}
		}
	}
	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - public folder files
		 */
		"/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
