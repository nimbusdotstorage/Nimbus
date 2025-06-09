type Params = Record<string, string | number | null | undefined>;

type CreateRequestOptions = {
	path: string;
	pathParams?: Params;
	queryParams?: Params;
};

/**
 * Creates a request function that can be used to fetch data from an API.
 * @param options - The options for the request.
 * @param options.path - The URL to fetch data from (without the base URL).
 * @param options.pathParams - The path parameters to replace in the URL.
 * @param options.queryParams - The query parameters to append to the URL.
 * @returns A function that can be used to fetch data from an API.
 */
export function createRequest({ path, pathParams = {}, queryParams = {} }: CreateRequestOptions) {
	return (signal: AbortSignal) => {
		// Get the base URL based on environment
		const baseUrl =
			process.env.NODE_ENV === "development" ? "http://localhost:1284/api" : "https://api.nimbus.storage/api";

		// Replace path params in the URL
		let currentPath = path;
		for (const [key, value] of Object.entries(pathParams)) {
			currentPath = currentPath.replace(`:${key}`, encodeURIComponent(String(value)));
		}

		// Append query string
		const searchParams = new URLSearchParams();
		for (const [key, value] of Object.entries(queryParams)) {
			if (value !== null && value !== undefined && value !== "") {
				searchParams.append(key, String(value));
			}
		}
		const queryString = searchParams.toString();
		const query = queryString ? `?${queryString}` : "";

		// Construct the full URL
		const fullUrl = `${baseUrl}${currentPath}${query}`;

		return fetch(fullUrl, { signal });
	};
}
