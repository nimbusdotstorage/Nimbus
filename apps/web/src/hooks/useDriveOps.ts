import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { DriveStorageDetails, PinnedFolder } from "@/lib/types";
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

const PINNED_FOLDERS_QUERY_KEY = "pinnedFolders";

export const usePinnedFolders = () => {
	return useQuery<PinnedFolder[]>({
		queryKey: [PINNED_FOLDERS_QUERY_KEY],
		queryFn: async () => {
			const response = await axios.get(`${clientEnv.NEXT_PUBLIC_BACKEND_URL}/api/drives/pinned`, {
				withCredentials: true,
			});
			// The backend returns folders as a JSON string in the message field
			const folders = JSON.parse(response.data.message) as PinnedFolder[];
			return folders;
		},
	});
};

export const usePinFolder = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: { folderId: string; name: string; provider: string }) => {
			const response = await axios.post(`${clientEnv.NEXT_PUBLIC_BACKEND_URL}/api/drives/pinned`, data, {
				withCredentials: true,
			});
			return response.data.message as string;
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: [PINNED_FOLDERS_QUERY_KEY] });
		},
	});
};

export const useUnpinFolder = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => {
			const response = await axios.delete(`${clientEnv.NEXT_PUBLIC_BACKEND_URL}/api/drives/pinned/${id}`, {
				withCredentials: true,
			});
			return response.data.message as string;
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: [PINNED_FOLDERS_QUERY_KEY] });
		},
	});
};
