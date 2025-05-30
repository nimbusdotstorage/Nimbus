/**
 * Builds a query string from a set of parameters.
 * @param params - The parameters to build the query string from.
 * @returns The query string.
 */
export function buildQueryString(params: Record<string, string | number | null | undefined>): string {
	const searchParams = new URLSearchParams();

	for (const [key, value] of Object.entries(params)) {
		if (value !== null && value !== undefined && value !== "") {
			searchParams.append(key, String(value));
		}
	}

	const query = searchParams.toString();
	return query ? `?${query}` : "";
}
