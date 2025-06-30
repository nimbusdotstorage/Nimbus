import { useMutation } from "@tanstack/react-query";
import type { DeleteFileParams } from "@/lib/types";
import { clientEnv } from "@/lib/env/client-env";
import axios, { type AxiosError } from "axios";
import { toast } from "sonner";

interface RenameFileParams {
	id: string;
	name: string;
}

export function useFileOperations() {
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
		onSuccess: () => {
			toast.success("File deleted successfully");
		},
		onError: (error: AxiosError) => {
			console.error("Error deleting file:", error);
			const errorMessage = error.message || "Failed to delete file";
			toast.error(errorMessage);
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
		onSuccess: () => {
			toast.success("File renamed successfully");
		},
		onError: (error: AxiosError) => {
			console.error("Error renaming file:", error);
			const errorMessage = error.message || "Failed to rename file";
			toast.error(errorMessage);
		},
	});

	const handleDeleteFile = (id: string) => {
		deleteFileMutation.mutate({ id });
	};

	const handleRenameFile = (id: string, name: string) => {
		return renameFileMutation.mutateAsync({ id, name });
	};

	return {
		handleDeleteFile,
		handleRenameFile,
		isDeleting: deleteFileMutation.isPending,
		isRenaming: renameFileMutation.isPending,
	};
}
