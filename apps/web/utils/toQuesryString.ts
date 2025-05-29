export function toQueryString(params: Record<string, string | number | null | undefined>): string {
	const query = Object.entries(params)
		.filter(([, value]) => value !== null && value !== undefined && value !== "")
		.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
		.join("&");

	return query ? `?${query}` : "";
}
