import type { DriveStorageDetails } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { clientEnv } from "@/lib/env/client-env";
import axios from "axios";

export function getStorageDetails(): {
	data: DriveStorageDetails;
	error: Error | null;
	isError: boolean;
	isPending: boolean;
} {
	const { data, error, isError, isPending } = useQuery({
		queryKey: ["storageDetails"],
		queryFn: async () => {
			const data = await axios.get(`${clientEnv.NEXT_PUBLIC_BACKEND_URL}/api/drives/about`, {
				withCredentials: true,
				signal: new AbortController().signal,
			});
			return data.data;
		},
	});
	return { data, error, isError, isPending };
}
