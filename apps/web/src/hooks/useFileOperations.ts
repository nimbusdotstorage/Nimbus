import { useMutation } from "@tanstack/react-query";
import type { DeleteFileParams } from "@/lib/types";
import { clientEnv } from "@/lib/env/client-env";
import axios, { type AxiosError } from "axios";
import { toast } from "sonner";

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

	const handleDeleteFile = (id: string) => {
		deleteFileMutation.mutate({ id });
	};

	return {
		handleDeleteFile,
	};
}
