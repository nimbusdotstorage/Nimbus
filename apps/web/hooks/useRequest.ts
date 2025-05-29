import { useCallback, useEffect, useRef, useState } from "react";
import { parseError } from "../utils/error/parse";

export function useRequest<ResponseBody>({
	request,
	triggers,
	manual,
}: {
	request: (signal: AbortSignal) => Promise<Response>;
	triggers: unknown[];
	manual?: boolean;
}) {
	const [data, setData] = useState<ResponseBody | null>(null);
	const [error, setError] = useState<Error | null>(null);
	const [loading, setLoading] = useState(false);
	const abortControllerRef = useRef<AbortController | null>(null);

	const fetchData = useCallback(async () => {
		abortControllerRef.current?.abort(); // abort previous request
		const controller = new AbortController();
		abortControllerRef.current = controller;

		setLoading(true);
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
			if (!controller.signal.aborted) setLoading(false);
		}
	}, [request, manual]);

	useEffect(() => {
		if (!manual) void fetchData();
		return () => {
			abortControllerRef.current?.abort();
		};
	}, triggers);

	return { data, fetchData, loading, error };
}
