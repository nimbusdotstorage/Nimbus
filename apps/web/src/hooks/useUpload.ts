import { useState } from "react";

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

	const handleCreateFolder = (folderName: string) => {
		console.log("Creating folder:", folderName);
		// Handle folder creation logic here
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
