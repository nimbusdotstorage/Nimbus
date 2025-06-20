import {
	MoreVertical,
	ExternalLink,
	FileText,
	Folder,
	Trash2,
	Edit3,
	FileImage,
	FileVideo,
	FileAudio,
	FileCode,
	FileSpreadsheet,
	Presentation,
	FileArchive,
	File,
	Copy,
} from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RenameFileDialog } from "@/components/dialogs/rename-file-dialog";
import { DeleteFileDialog } from "@/components/dialogs/delete-file-dialog";
import { formatFileSize } from "@/lib/file-utils";
import { PdfIcon } from "@/components/icons/pdf";
import { Button } from "@/components/ui/button";
import type { FileItem } from "@/lib/types";

interface FileBrowserDataProps {
	data: FileItem[];
	onFileSelect?: (file: FileItem) => void;
	onFolderNavigate?: (folderId: string) => void;
	onFileDeleted?: (fileId: string) => void;
	onFileRenamed?: (fileId: string, newName: string) => void;
}

// Helper function to get the appropriate icon for a file type
const getFileTypeIcon = (mimeType?: string, fileName?: string) => {
	if (!mimeType) return <File className="h-5 w-5 text-gray-500" />;

	// Folder
	if (mimeType === "application/vnd.google-apps.folder") {
		return <Folder className="h-5 w-5 text-blue-500" />;
	}

	// Images
	if (mimeType.startsWith("image/")) {
		return <FileImage className="h-5 w-5 text-green-500" />;
	}

	// Videos
	if (mimeType.startsWith("video/")) {
		return <FileVideo className="h-5 w-5 text-purple-500" />;
	}

	// Audio
	if (mimeType.startsWith("audio/")) {
		return <FileAudio className="h-5 w-5 text-pink-500" />;
	}

	// PDFs
	if (mimeType === "application/pdf") {
		return <PdfIcon className="h-5 w-5 text-red-500" />;
	}

	// Google Workspace Documents
	if (mimeType === "application/vnd.google-apps.document") {
		return <FileText className="h-5 w-5 text-blue-600" />;
	}

	// Google Workspace Spreadsheets
	if (mimeType === "application/vnd.google-apps.spreadsheet") {
		return <FileSpreadsheet className="h-5 w-5 text-green-600" />;
	}

	// Google Workspace Presentations
	if (mimeType === "application/vnd.google-apps.presentation") {
		return <Presentation className="h-5 w-5 text-orange-500" />;
	}

	// Microsoft Office Documents
	if (mimeType.includes("wordprocessingml") || mimeType === "application/msword") {
		return <FileText className="h-5 w-5 text-blue-600" />;
	}

	// Microsoft Office Spreadsheets
	if (mimeType.includes("spreadsheetml") || mimeType === "application/vnd.ms-excel") {
		return <FileSpreadsheet className="h-5 w-5 text-green-600" />;
	}

	// Microsoft Office Presentations
	if (mimeType.includes("presentationml") || mimeType === "application/vnd.ms-powerpoint") {
		return <Presentation className="h-5 w-5 text-orange-500" />;
	}

	// Code files
	if (mimeType.startsWith("text/") || isCodeFile(mimeType, fileName)) {
		return <FileCode className="h-5 w-5 text-yellow-600" />;
	}

	// Archives
	if (isArchiveFile(mimeType)) {
		return <FileArchive className="h-5 w-5 text-amber-600" />;
	}

	// Default file icon
	return <FileText className="h-5 w-5 text-gray-500" />;
};

// Helper function to check if file is a code file
const isCodeFile = (mimeType: string, fileName?: string): boolean => {
	const codeMimeTypes = [
		"application/javascript",
		"application/typescript",
		"text/javascript",
		"text/typescript",
		"text/css",
		"text/html",
		"application/json",
		"text/xml",
		"application/xml",
	];

	if (codeMimeTypes.includes(mimeType)) return true;

	// Check by file extension if fileName is provided
	if (fileName) {
		const codeExtensions = [
			"js",
			"jsx",
			"ts",
			"tsx",
			"css",
			"scss",
			"less",
			"html",
			"htm",
			"json",
			"xml",
			"yaml",
			"yml",
			"py",
			"java",
			"c",
			"cpp",
			"h",
			"cs",
			"php",
			"rb",
			"go",
			"rs",
			"swift",
			"kt",
			"dart",
			"vue",
		];
		const extension = fileName.split(".").pop()?.toLowerCase();
		return extension ? codeExtensions.includes(extension) : false;
	}

	return false;
};

// Helper function to check if file is an archive
const isArchiveFile = (mimeType: string): boolean => {
	const archiveMimeTypes = [
		"application/zip",
		"application/x-rar-compressed",
		"application/x-7z-compressed",
		"application/x-tar",
		"application/gzip",
		"application/x-bzip2",
	];

	return archiveMimeTypes.includes(mimeType);
};

export function FileBrowserData({
	data,
	onFileSelect,
	onFolderNavigate,
	onFileDeleted,
	onFileRenamed,
}: FileBrowserDataProps) {
	const [deleteDialog, setDeleteDialog] = useState<{
		isOpen: boolean;
		file: FileItem | null;
	}>({
		isOpen: false,
		file: null,
	});

	const [renameDialog, setRenameDialog] = useState<{
		isOpen: boolean;
		file: FileItem | null;
	}>({
		isOpen: false,
		file: null,
	});

	const handleExternalLink = (file: FileItem) => {
		if (file.webViewLink) {
			window.open(file.webViewLink, "_blank");
		}
	};

	const handleRowClick = (file: FileItem) => {
		if (file.mimeType === "application/vnd.google-apps.folder") {
			onFolderNavigate?.(file.id);
		} else {
			onFileSelect?.(file);
		}
	};

	const openDeleteDialog = (file: FileItem) => {
		setDeleteDialog({
			isOpen: true,
			file,
		});
	};

	const openRenameDialog = (file: FileItem) => {
		setRenameDialog({
			isOpen: true,
			file,
		});
	};

	return (
		<>
			<div className="overflow-hidden rounded-md border">
				<table className="w-full table-fixed">
					<thead className="text-muted-foreground bg-muted/50 text-left text-xs font-medium">
						<tr>
							<th className="w-[50%] p-3">Name</th>
							<th className="w-[15%] p-3">Size</th>
							<th className="w-[20%] p-3">Modified</th>
							<th className="w-[15%] p-3">Actions</th>
						</tr>
					</thead>
					<tbody>
						{data.map(file => {
							return (
								<tr
									key={file.id}
									className="hover:bg-accent/10 cursor-pointer border-t transition-colors"
									onClick={() => handleRowClick(file)}
									onKeyDown={e => {
										if (e.key === "Enter" || e.key === " ") {
											e.preventDefault();
											handleRowClick(file);
										}
									}}
									tabIndex={0}
									role="button"
								>
									<td className="w-[50%] p-4">
										<div className="flex max-w-full min-w-0 items-center gap-3">
											{/* File Type Icon */}
											<div className="flex h-8 w-8 flex-shrink-0 items-center justify-center">
												{getFileTypeIcon(file.mimeType, file.name)}
											</div>

											{/* File/Folder name */}
											<span className={`text-foreground block max-w-full truncate font-medium`} title={file.name}>
												{file.name}
											</span>
										</div>
									</td>
									<td className="text-muted-foreground w-[15%] truncate p-3 text-sm">
										{file.size ? formatFileSize(Number.parseInt(file.size)) : "—"}
									</td>
									<td className="text-muted-foreground w-[20%] truncate p-3 text-sm">
										{file.modifiedTime ? format(new Date(file.modifiedTime), "MMM d, yyyy 'at' h:mm a") : "—"}
									</td>
									<td className="w-[15%] p-3">
										<div className="flex items-center justify-start" onClick={e => e.stopPropagation()}>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant="ghost" className="h-8 w-8 p-0" onClick={e => e.stopPropagation()}>
														<span className="sr-only">Open menu</span>
														<MoreVertical className="h-4 w-4" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="start">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuItem
														onClick={e => {
															e.stopPropagation();
															openRenameDialog(file);
														}}
													>
														<Edit3 className="mr-2 h-4 w-4" />
														Rename
													</DropdownMenuItem>
													{file.webViewLink && (
														<DropdownMenuItem
															onClick={e => {
																e.stopPropagation();
																handleExternalLink(file);
															}}
														>
															<ExternalLink className="mr-2 h-4 w-4" />
															Open in Google Drive
														</DropdownMenuItem>
													)}
													{file.webViewLink && (
														<DropdownMenuItem
															onClick={e => {
																e.stopPropagation();
																if (file.webViewLink) {
																	void navigator.clipboard.writeText(file.webViewLink);
																}
															}}
														>
															<Copy className="mr-2 h-4 w-4" />
															Copy file link
														</DropdownMenuItem>
													)}
													<DropdownMenuSeparator />
													<DropdownMenuItem
														onClick={e => {
															e.stopPropagation();
															openDeleteDialog(file);
														}}
														className="text-destructive focus:text-destructive"
													>
														<Trash2 className="mr-2 h-4 w-4" />
														Delete
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>

			{/* Delete Dialog */}
			<DeleteFileDialog
				open={deleteDialog.isOpen}
				onOpenChange={open => setDeleteDialog(prev => ({ ...prev, isOpen: open }))}
				file={deleteDialog.file}
				onFileDeleted={onFileDeleted}
			/>

			{/* Rename Dialog */}
			<RenameFileDialog
				open={renameDialog.isOpen}
				onOpenChange={open => setRenameDialog(prev => ({ ...prev, isOpen: open }))}
				file={renameDialog.file}
				onFileRenamed={onFileRenamed}
			/>
		</>
	);
}
