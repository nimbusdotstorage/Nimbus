import { useCallback, useEffect, useRef, useState } from "react";
import { parseError } from "@/web/utils/error";

type UseRequestParams = {
	request: (signal: AbortSignal) => Promise<Response>;
	triggers?: unknown[];
	manual?: boolean;
};

type UseRequestReturn<ResponseBody> = {
	data: ResponseBody | null;
	error: Error | null;
	isLoading: boolean;
	refetch: () => void;
};

/**
 * A hook that fetches data from an API and returns the data, refetch function, error, and loading state.
 * @param options - The options for the request.
 * @param options.request - The function that fetches the data.
 * @param options.triggers - The triggers array that cause the request to be made.
 * @param options.manual - Whether the request should be made manually.
 * @returns The data, refetch function, error, and loading state.
 */
export function useRequest<ResponseBody>({
	request,
	triggers = [],
	manual = false,
}: UseRequestParams): UseRequestReturn<ResponseBody> {
	const [data, setData] = useState<ResponseBody | null>(null);
	const [error, setError] = useState<Error | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const abortControllerRef = useRef<AbortController | null>(null);

	const fetchData = useCallback(async () => {
		abortControllerRef.current?.abort(); // abort previous request
		const controller = new AbortController();
		abortControllerRef.current = controller;

		setIsLoading(true);
		setError(null);
		try {
			const res = await request(controller.signal);
			if (!res.ok) {
				const error = (await res.json()) as { message: string };
				throw new Error(error.message);
			}
			const json = (await res.json()) as ResponseBody;
			setData(json);
		} catch (err) {
			if (controller.signal.aborted) return; // ignore abort errors
			setError(new Error(parseError(err)));
		} finally {
			if (!controller.signal.aborted) setIsLoading(false);
		}
	}, [request]);

	useEffect(() => {
		if (!manual) void fetchData();
		return () => {
			abortControllerRef.current?.abort();
		};
	}, triggers);

	return { data, refetch: fetchData, isLoading, error };
}
