import { useCallback, useEffect, useRef, useState } from "react";

function useRequest<ResponseBody>({ request, triggers }: { request: () => Promise<Response>; triggers: unknown[] }) {
	const [data, setData] = useState<ResponseBody | null>(null);
	const [error, setError] = useState<Error | null>(null);
	const [loading, setLoading] = useState(false);
	const cancelledRef = useRef(false);

	const fetchData = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const res = await request();
			if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
			const json = (await res.json()) as ResponseBody;
			if (!cancelledRef.current) setData(json);
		} catch (err) {
			if (!cancelledRef.current) setError(err instanceof Error ? err : new Error(String(err)));
		} finally {
			if (!cancelledRef.current) setLoading(false);
		}
	}, [request]);

	useEffect(() => {
		cancelledRef.current = false;
		void fetchData();
		return () => {
			cancelledRef.current = true;
		};
	}, triggers);

	return { data, fetchData, loading, error };
}

export default useRequest;
