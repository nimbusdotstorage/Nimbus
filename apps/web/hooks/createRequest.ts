type Params = Record<string, string | number | null | undefined>;

type CreateRequestOptions = {
	url: string;
	pathParams?: Params;
	queryParams?: Params;
};

/**
 * Creates a request function that can be used to fetch data from an API.
 * @param options - The options for the request.
 * @param options.url - The URL to fetch data from.
 * @param options.pathParams - The path parameters to replace in the URL.
 * @param options.queryParams - The query parameters to append to the URL.
 * @returns A function that can be used to fetch data from an API.
 */
export function createRequest({ url, pathParams = {}, queryParams = {} }: CreateRequestOptions) {
	return (signal: AbortSignal) => {
		// Replace path params in the URL
		let resolvedUrl = url;
		for (const [key, value] of Object.entries(pathParams)) {
			resolvedUrl = resolvedUrl.replace(`:${key}`, encodeURIComponent(String(value)));
		}

		// Append query string
		const searchParams = new URLSearchParams();
		for (const [key, value] of Object.entries(queryParams)) {
			if (value !== null && value !== undefined && value !== "") {
				searchParams.append(key, String(value));
			}
		}
		const queryString = searchParams.toString();
		if (queryString) {
			resolvedUrl += `?${queryString}`;
		}

		return fetch(resolvedUrl, { signal });
	};
}
