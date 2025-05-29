import { useCallback, useEffect, useRef, useState } from "react";
import { parseError } from "../utils/error/parse";

function useRequest<ResponseBody>({
	request,
	triggers,
}: {
	request: (signal: AbortSignal) => Promise<Response>;
	triggers: unknown[];
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
			if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
			const json = (await res.json()) as ResponseBody;
			setData(json);
		} catch (err) {
			if (controller.signal.aborted) return; // ignore abort errors
			setError(new Error(parseError(err)));
		} finally {
			if (!controller.signal.aborted) setLoading(false);
		}
	}, [request]);

	useEffect(() => {
		void fetchData();
		return () => {
			abortControllerRef.current?.abort();
		};
	}, triggers);

	return { data, fetchData, loading, error };
}

export default useRequest;
