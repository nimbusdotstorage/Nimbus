/**
 * Extracts a token from a URL by trying multiple strategies:
 * 1. Query parameters (token, resetToken, t)
 * 2. Last path segment (if not 'reset-password')
 *
 * @param url - The URL to extract the token from
 * @returns The extracted token or null if not found
 */

export function extractTokenFromUrl(url: string): string | null {
	const urlObj = new URL(url);

	// Try different possible parameter names
	let token =
		urlObj.searchParams.get("token") || urlObj.searchParams.get("resetToken") || urlObj.searchParams.get("t") || null;

	if (!token) {
		const pathParts = urlObj.pathname.split("/");
		const lastPart = pathParts[pathParts.length - 1];
		token = lastPart && lastPart !== "reset-password" ? lastPart : null;
	}

	return token;
}
