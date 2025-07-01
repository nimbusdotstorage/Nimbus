// TODO: Move to useFileOperations.ts

import { useFileOperations } from "@/hooks/useFileOperations";
import { useState } from "react";

export function useUpload() {
	const [uploadFileOpen, setUploadFileOpen] = useState(false);
	const [uploadFolderOpen, setUploadFolderOpen] = useState(false);
	const [createFolderOpen, setCreateFolderOpen] = useState(false);

	const { handleCreateFolder, isCreatingFolder } = useFileOperations();

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

	const handleCreateFolderAction = async (folderName: string, parentId?: string | undefined) => {
		try {
			await handleCreateFolder(folderName, parentId);
			setCreateFolderOpen(false);
		} catch (error) {
			// Error handling is done in the mutation
			console.error("Create folder failed:", error);
		}
	};

	return {
		uploadFileOpen,
		setUploadFileOpen,
		uploadFolderOpen,
		setUploadFolderOpen,
		createFolderOpen,
		setCreateFolderOpen,
		handleFileUpload,
		handleFolderUpload,
		handleCreateFolder: handleCreateFolderAction,
		isCreatingFolder,
	};
}
