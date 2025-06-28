import type { DriveStorageDetails } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { clientEnv } from "@/lib/env/client-env";
import axios from "axios";

export const useStorageDetails = () => {
	return useQuery<DriveStorageDetails>({
		queryKey: ["storageDetails"],
		queryFn: async () => {
			const response = await axios.get(`${clientEnv.NEXT_PUBLIC_BACKEND_URL}/api/drives/about`, {
				withCredentials: true,
				signal: new AbortController().signal,
			});
			return response.data;
		},
	});
};
