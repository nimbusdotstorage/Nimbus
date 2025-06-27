import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { DeleteFileParams } from "@/lib/types";
import { clientEnv } from "@/lib/env/client-env";
import axios, { type AxiosError } from "axios";
import { toast } from "sonner";

export function useFileOperations(parentId: string, nextPageToken?: string) {
	const queryClient = useQueryClient();
	const filesQuery = useQuery({
		queryKey: ["files", parentId, nextPageToken],
		queryFn: async () => {
			const response = await axios.get(`${clientEnv.NEXT_PUBLIC_BACKEND_URL}/api/files`, {
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			});
			return response.data;
		},
		staleTime: 5 * 60 * 1000, // 5 minutes
		retry: 2,
	});

	const deleteFileMutation = useMutation({
		mutationFn: async ({ id }: DeleteFileParams) => {
			const response = await axios.delete(`${clientEnv.NEXT_PUBLIC_BACKEND_URL}/api/files`, {
				params: { id },
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
				signal: new AbortController().signal,
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

	const handleDeleteFile = (id: string) => {
		deleteFileMutation.mutate({ id });
	};

	return {
		filesQuery,
		handleDeleteFile,
	};
}
