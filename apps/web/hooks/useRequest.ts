import { useEffect, useState } from "react";

function useRequest<T>({ request, triggers }: { request: () => Promise<Response>; triggers: unknown[] }) {
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<Error | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		let cancelled = false;

		async function fetchData() {
			setLoading(true);
			setError(null);
			try {
				const res = await request();
				if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
				const json = (await res.json()) as T;
				if (!cancelled) setData(json);
			} catch (err) {
				if (!cancelled) setError(err instanceof Error ? err : new Error(String(err)));
			} finally {
				if (!cancelled) setLoading(false);
			}
		}

		fetchData();

		return () => {
			cancelled = true;
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, triggers);

	return { data, error, loading };
}

export default useRequest;
