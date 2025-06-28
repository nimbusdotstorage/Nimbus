import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { DeleteFileParams } from "@/lib/types";
import { clientEnv } from "@/lib/env/client-env";
import axios, { type AxiosError } from "axios";
import { toast } from "sonner";

const API_BASE = `${clientEnv.NEXT_PUBLIC_BACKEND_URL}/api/files`;
const defaultAxiosConfig = {
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
	signal: new AbortController().signal,
};

export function useFileOperations(parentId: string, pageSize: number, returnedValues: string, nextPageToken?: string) {
	const queryClient = useQueryClient();

	const getFiles = useQuery({
		queryKey: ["files", parentId, nextPageToken, pageSize],
		queryFn: async () => {
			const response = await axios.get(API_BASE, {
				params: { pageSize, nextPageToken, parentId, returnedValues },
				...defaultAxiosConfig,
			});
			return response.data;
		},
		staleTime: 5 * 60 * 1000, // 5 minutes
		retry: 2,
	});

	const getFile = useQuery({
		queryKey: ["file", parentId, returnedValues],
		queryFn: async () => {
			const response = await axios.get(API_BASE, {
				params: { parentId, returnedValues },
				...defaultAxiosConfig,
			});
			return response.data;
		},
		staleTime: 5 * 60 * 1000, // 5 minutes
		retry: 2,
	});

	const deleteFile = useMutation({
		mutationFn: async ({ id }: DeleteFileParams) => {
			const response = await axios.delete(API_BASE, {
				params: { id },
				...defaultAxiosConfig,
			});
			return response.data;
		},
		onSuccess: async () => {
			toast.success("File deleted successfully");
			// Invalidate files queries to refetch the data
			await queryClient.invalidateQueries({ queryKey: ["files"] });
		},
		onError: (error: AxiosError) => {
			console.error("Error deleting file:", error);
			const errorMessage = error.message || "Failed to delete file";
			toast.error(errorMessage);
		},
	});

	return {
		getFiles,
		getFile,
		deleteFile,
	};
}
