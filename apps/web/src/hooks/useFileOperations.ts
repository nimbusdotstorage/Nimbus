import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export function useGetFiles(parentId?: string, pageSize?: number, returnedValues?: string, nextPageToken?: string) {
	return useQuery({
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
}

export function useGetFile(parentId: string, returnedValues: string) {
	return useQuery({
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
}

export function useDeleteFile(fileId: string) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async () => {
			const response = await axios.delete(API_BASE, {
				params: { fileId },
				...defaultAxiosConfig,
			});
			return response.data;
		},
		onSuccess: async () => {
			toast.success("File deleted successfully");
			await queryClient.invalidateQueries({ queryKey: ["files"] });
		},
		onError: (error: AxiosError) => {
			console.error("Error deleting file:", error);
			const errorMessage = error.message || "Failed to delete file";
			toast.error(errorMessage);
		},
	});
}

export function useUpdateFile(fileId: string, name: string) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async () => {
			const response = await axios.put(API_BASE, {
				params: { fileId, name },
				...defaultAxiosConfig,
			});
			return response.data;
		},
		onSuccess: async () => {
			toast.success("File updated successfully");
			await queryClient.invalidateQueries({ queryKey: ["files"] });
		},
		onError: (error: AxiosError) => {
			console.error("Error updating file:", error);
			const errorMessage = error.message || "Failed to update file";
			toast.error(errorMessage);
		},
	});
}
