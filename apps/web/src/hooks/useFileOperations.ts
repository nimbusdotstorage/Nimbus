import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import type { DeleteFileParams, FileItem } from "@/lib/types";
import { clientEnv } from "@/lib/env/client-env";
import axios, { type AxiosError } from "axios";
import { toast } from "sonner";

interface RenameFileParams {
	id: string;
	name: string;
}

interface CreateFolderParams {
	name: string;
	parentId?: string;
}

// Query key factory for files
const FILES_QUERY_KEY = "files";

export const getFilesQueryKey = (type?: string | null) => [FILES_QUERY_KEY, type];

// Hook for fetching files with TanStack Query
export function useFiles(type?: string | null) {
	return useQuery<FileItem[]>({
		queryKey: getFilesQueryKey(type),
		queryFn: async () => {
			const params = new URLSearchParams();
			if (type) params.set("type", type);

			const response = await axios.get(`${clientEnv.NEXT_PUBLIC_BACKEND_URL}/api/files?${params.toString()}`, {
				withCredentials: true,
				signal: new AbortController().signal,
			});
			return response.data;
		},
	});
}

export function useFileOperations() {
	const queryClient = useQueryClient();

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
		onMutate: async ({ id }) => {
			// Cancel any outgoing refetches
			await queryClient.cancelQueries({ queryKey: [FILES_QUERY_KEY] });

			// Snapshot the previous value
			const previousFiles = queryClient.getQueriesData<FileItem[]>({ queryKey: [FILES_QUERY_KEY] });

			// Optimistically update all file queries
			queryClient.setQueriesData<FileItem[]>({ queryKey: [FILES_QUERY_KEY] }, oldFiles => {
				if (!oldFiles) return oldFiles;
				return oldFiles.filter(file => file.id !== id);
			});

			// Return a context object with the snapshotted value
			return { previousFiles };
		},
		onError: (error: AxiosError<{ message?: string }>, variables, context) => {
			// Rollback on error
			if (context?.previousFiles) {
				context.previousFiles.forEach(([queryKey, data]) => {
					queryClient.setQueryData(queryKey, data);
				});
			}
			console.error("Error deleting file:", error);

			// Extract proper error message from server response
			const errorMessage =
				error.response?.data?.message ||
				error.message ||
				`Failed to delete file (${error.response?.status || "Unknown error"})`;
			toast.error(errorMessage);
		},
		onSuccess: () => {
			// Only show success if we actually succeeded
			toast.success("File deleted successfully");
		},
		onSettled: () => {
			// Always refetch after error or success to ensure consistency
			queryClient.invalidateQueries({ queryKey: [FILES_QUERY_KEY] });
		},
	});

	const renameFileMutation = useMutation({
		mutationFn: async ({ id, name }: RenameFileParams) => {
			const response = await axios.put(`${clientEnv.NEXT_PUBLIC_BACKEND_URL}/api/files`, null, {
				params: { id, name },
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
				signal: new AbortController().signal,
			});
			return response.data;
		},
		onMutate: async ({ id, name }) => {
			// Cancel any outgoing refetches
			await queryClient.cancelQueries({ queryKey: [FILES_QUERY_KEY] });

			// Snapshot the previous value
			const previousFiles = queryClient.getQueriesData<FileItem[]>({ queryKey: [FILES_QUERY_KEY] });

			// Optimistically update all file queries
			queryClient.setQueriesData<FileItem[]>({ queryKey: [FILES_QUERY_KEY] }, oldFiles => {
				if (!oldFiles) return oldFiles;
				return oldFiles.map(file => (file.id === id ? { ...file, name } : file));
			});

			// Return a context object with the snapshotted value
			return { previousFiles };
		},
		onError: (error: AxiosError<{ message?: string }>, variables, context) => {
			// Rollback on error
			if (context?.previousFiles) {
				context.previousFiles.forEach(([queryKey, data]) => {
					queryClient.setQueryData(queryKey, data);
				});
			}
			console.error("Error renaming file:", error);

			// Extract proper error message from server response
			const errorMessage =
				error.response?.data?.message ||
				error.message ||
				`Failed to rename file (${error.response?.status || "Unknown error"})`;
			toast.error(errorMessage);
		},
		onSuccess: () => {
			// Only show success if we actually succeeded
			toast.success("File renamed successfully");
		},
		onSettled: () => {
			// Always refetch after error or success to ensure consistency
			queryClient.invalidateQueries({ queryKey: [FILES_QUERY_KEY] });
		},
	});

	const createFolderMutation = useMutation({
		mutationFn: async ({ name, parentId }: CreateFolderParams) => {
			const response = await axios.post(`${clientEnv.NEXT_PUBLIC_BACKEND_URL}/api/files`, null, {
				params: { name, mimeType: "application/vnd.google-apps.folder", parents: parentId },
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
				signal: new AbortController().signal,
			});
			return response.data;
		},
		onSuccess: newFolder => {
			// Add the new folder to all relevant queries
			queryClient.setQueriesData<FileItem[]>({ queryKey: [FILES_QUERY_KEY] }, oldFiles => {
				if (!oldFiles) return [newFolder];
				return [newFolder, ...oldFiles];
			});
			toast.success("Folder created successfully");
		},
		onError: (error: AxiosError<{ message?: string }>) => {
			console.error("Error creating folder:", error);

			// Extract proper error message from server response
			const errorMessage =
				error.response?.data?.message ||
				error.message ||
				`Failed to create folder (${error.response?.status || "Unknown error"})`;
			toast.error(errorMessage);
		},
		onSettled: () => {
			// Refetch to ensure consistency
			queryClient.invalidateQueries({ queryKey: [FILES_QUERY_KEY] });
		},
	});

	const handleDeleteFile = (id: string) => {
		return deleteFileMutation.mutateAsync({ id });
	};

	const handleRenameFile = (id: string, name: string) => {
		return renameFileMutation.mutateAsync({ id, name });
	};

	const handleCreateFolder = (name: string, parentId?: string) => {
		return createFolderMutation.mutateAsync({ name, parentId });
	};

	return {
		handleDeleteFile,
		handleRenameFile,
		handleCreateFolder,
		isDeleting: deleteFileMutation.isPending,
		isRenaming: renameFileMutation.isPending,
		isCreatingFolder: createFolderMutation.isPending,
	};
}
