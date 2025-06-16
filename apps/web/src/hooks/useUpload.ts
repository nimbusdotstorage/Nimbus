// TODO: Move to useFileOperations.ts

import type { CreateFolderParams } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { clientEnv } from "@/lib/env/client-env";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";

export function useUpload() {
	const [uploadFileOpen, setUploadFileOpen] = useState(false);
	const [uploadFolderOpen, setUploadFolderOpen] = useState(false);
	const [createFolderOpen, setCreateFolderOpen] = useState(false);

	const handleFileUpload = (files: FileList) => {
		console.log(
			"Uploading files:",
			Array.from(files).map(f => f.name)
		);
		// Handle file upload logic here
	};

	const handleFolderUpload = (files: FileList) => {
		console.log(
			"Uploading folder with files:",
			Array.from(files).map(f => f.webkitRelativePath || f.name)
		);
		// Handle folder upload logic here
	};

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
		onSuccess: () => {
			setCreateFolderOpen(false);
			toast.success("Folder created successfully");
		},
		onError: (error: AxiosError) => {
			console.error("Error creating folder:", error);
			const errorMessage = error.message || "Failed to create folder";
			toast.error(errorMessage);
		},
	});

	const handleCreateFolder = (folderName: string, parentId?: string | undefined) => {
		createFolderMutation.mutate({ name: folderName, parentId });
		return;
	};

	return {
		// Dialog states
		uploadFileOpen,
		uploadFolderOpen,
		createFolderOpen,
		// Dialog state setters
		setUploadFileOpen,
		setUploadFolderOpen,
		setCreateFolderOpen,
		// Handlers
		handleFileUpload,
		handleFolderUpload,
		handleCreateFolder,
	};
}
