import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateFileParams, DeleteFileParams } from "@/lib/types";
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

/**
 * Hook for listing files
 */
export const useListFiles = (pageSize?: number, nextPageToken?: string) => {
	return useQuery({
		queryKey: ["files", { pageSize, nextPageToken }],
		queryFn: async () => {
			const response = await axios.get(API_BASE, { ...defaultAxiosConfig, params: { pageSize, nextPageToken } });
			return response.data;
		},
	});
};

/**
 * Hook for listing a file
 */
export const useListFile = ({ id }: { id: string }) => {
	return useQuery({
		queryKey: ["file"],
		queryFn: async () => {
			const response = await axios.get(API_BASE, { ...defaultAxiosConfig, params: { id } });
			return response.data;
		},
	});
};

/**
 * Hook for creating a file
 */
export const useCreateFile = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ name, parentId, mimeType, fileContent }: CreateFileParams) => {
			const response = await axios.post(API_BASE, {
				...defaultAxiosConfig,
				params: { name, parentId, mimeType, fileContent },
			});
			return response.data;
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["files"] });
		},
		onError: (error: AxiosError) => {
			console.error("Error creating file:", error);
			const errorMessage = error.message || "Failed to create file";
			toast.error(errorMessage);
		},
	});
};

/**
 * Hook for deleting a file
 */
export const useDeleteFile = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id }: DeleteFileParams) => {
			const response = await axios.delete(API_BASE, {
				...defaultAxiosConfig,
				params: { id },
			});
			return response.data;
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["files"] });
			toast.success("File deleted successfully");
		},
		onError: (error: AxiosError) => {
			console.error("Error deleting file:", error);
			const errorMessage = error.message || "Failed to delete file";
			toast.error(errorMessage);
		},
	});
};
