import {
	FileText,
	Folder,
	MoreVertical,
	ExternalLink,
	Copy,
	Download,
	Image,
	Video,
	Music,
	Archive,
	Code,
	FileSpreadsheet,
	Presentation,
	File,
} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RenameFileDialog } from "@/components/dialogs/rename-file-dialog";
import { DeleteFileDialog } from "@/components/dialogs/delete-file-dialog";
import { useFileOperations } from "@/hooks/useFileOperations";
import { formatFileSize } from "@/lib/file-utils";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PdfIcon } from "@/components/icons";
import type { FileItem } from "@/lib/types";
import { useTags } from "@/hooks/useTags";
import { fileSize } from "@/lib/utils";
import { FileTags } from "./file-tags";
import { useState } from "react";
import type { JSX } from "react";
import { toast } from "sonner";
import Link from "next/link";

// TODO: Typing of the file data needs to be updated
export function FileBrowserData({
	data,
	refetch,
	onOptimisticDelete,
	onOptimisticRename,
	onRollback,
}: {
	data: FileItem[];
	refetch: () => void;
	onOptimisticDelete?: (fileId: string) => void;
	onOptimisticRename?: (fileId: string, newName: string) => void;
	onRollback?: () => void;
}) {
	return (
		<FilesList
			data={data}
			refetch={refetch}
			onOptimisticDelete={onOptimisticDelete}
			onOptimisticRename={onOptimisticRename}
			onRollback={onRollback}
		/>
	);
}

function FilesList({
	data,
	refetch,
	onOptimisticDelete,
	onOptimisticRename,
	onRollback,
}: {
	data: FileItem[];
	refetch: () => void;
	onOptimisticDelete?: (fileId: string) => void;
	onOptimisticRename?: (fileId: string, newName: string) => void;
	onRollback?: () => void;
}) {
	const searchParams = useSearchParams();
	const { tags } = useTags();

	return (
		<div className="overflow-hidden rounded-md border">
			<table className="w-full">
				<colgroup>
					<col className="w-2/5" />
					<col className="w-1/5" />
					<col className="w-1/6" />
					<col className="w-1/8" />
					<col className="w-1/8" />
				</colgroup>
				<thead className="text-muted-foreground bg-muted/50 text-left text-xs font-medium">
					<tr>
						<th className="p-3 font-semibold">Name</th>
						<th className="p-3 font-semibold">Modified</th>
						<th className="p-3 font-semibold">Size</th>
						<th className="p-3 font-semibold">Actions</th>
						<th className="p-3 font-semibold">Tags</th>
					</tr>
				</thead>
				<tbody>
					{data.map(file => {
						// Use new formatFileSize if size is a number, otherwise fallback to existing logic
						const size = file.size
							? typeof file.size === "number"
								? formatFileSize(file.size)
								: fileSize(file.size)
							: "—";

						const params = new URLSearchParams(searchParams.toString());
						params.set("id", file.id);

						// Format modified date better
						const modifiedDate = file.modifiedTime
							? new Date(file.modifiedTime).toLocaleDateString("en-US", {
									year: "numeric",
									month: "short",
									day: "numeric",
									hour: "2-digit",
									minute: "2-digit",
								})
							: file.modified;

						// Determine file type for dialogs
						const fileType =
							file.mimeType === "application/vnd.google-apps.folder" || file.type === "folder" ? "folder" : "file";

						return (
							<tr
								key={file.id}
								className="hover:bg-accent/10 relative cursor-pointer border-t transition-colors"
								tabIndex={0}
								onKeyDown={e => {
									if (e.key === "Enter" || e.key === " ") {
										// Navigate to file preview
										window.location.href = "?" + params.toString();
									}
								}}
							>
								<td className="p-4">
									<Link href={"?" + params.toString()} className="absolute inset-0" />
									<div className="relative z-10 flex min-w-0 items-center gap-3">
										<div className="flex-shrink-0">{getModernFileIcon(file.mimeType, file.name)}</div>
										<span className="truncate text-sm font-medium">{file.name}</span>
									</div>
								</td>
								<td className="text-muted-foreground p-3 text-sm">{modifiedDate}</td>
								<td className="text-muted-foreground p-3 text-sm">{size}</td>
								<td className="relative p-3">
									<FileActions
										file={file}
										fileType={fileType}
										onRefetch={refetch}
										onOptimisticDelete={onOptimisticDelete}
										onOptimisticRename={onOptimisticRename}
										onRollback={onRollback}
									/>
								</td>
								<td className="relative p-3">
									<FileTags file={file} availableTags={tags} refetch={refetch} />
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

function FileActions({
	file,
	fileType,
	onRefetch,
	onOptimisticDelete,
	onOptimisticRename,
	onRollback,
}: {
	file: FileItem;
	fileType: "file" | "folder";
	onRefetch: () => void;
	onOptimisticDelete?: (fileId: string) => void;
	onOptimisticRename?: (fileId: string, newName: string) => void;
	onRollback?: () => void;
}) {
	const { handleRenameFile, handleDeleteFile } = useFileOperations();
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);

	const handleDelete = async () => {
		// Optimistic update: remove file from UI immediately
		onOptimisticDelete?.(file.id);

		try {
			// Use the hook function that returns a promise
			await new Promise<void>((resolve, reject) => {
				// The handleDeleteFile function triggers the mutation
				handleDeleteFile(file.id);

				// Since the mutation has success/error callbacks via toast,
				// we'll wait a bit and then refetch to ensure UI is updated
				setTimeout(async () => {
					try {
						await onRefetch();
						resolve();
					} catch (error) {
						reject(error);
					}
				}, 1000);
			});
		} catch (error) {
			// Rollback on error
			onRollback?.();
			throw error;
		}
	};

	const handleRename = async (newName: string) => {
		// Optimistic update: change name in UI immediately
		onOptimisticRename?.(file.id, newName);

		try {
			await handleRenameFile(file.id, newName);
			onRefetch();
		} catch (error) {
			// Rollback on error
			onRollback?.();
			throw error;
		}
	};

	const handleCopyLink = () => {
		if (file.webViewLink) {
			navigator.clipboard.writeText(file.webViewLink);
			toast.success("Link copied to clipboard");
		} else {
			toast.error("No shareable link available");
		}
	};

	const handleOpenInDrive = () => {
		if (file.webViewLink) {
			window.open(file.webViewLink, "_blank");
		} else {
			toast.error("Cannot open in Google Drive");
		}
	};

	const handleDownload = () => {
		if (file.webContentLink) {
			window.open(file.webContentLink, "_blank");
		} else {
			toast.error("Download not available");
		}
	};

	return (
		<>
			<div className="flex items-center justify-start" onClick={e => e.stopPropagation()}>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon" className="relative h-8 w-8">
							<MoreVertical className="h-4 w-4" />
							<span className="sr-only">Open menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{file.webViewLink && (
							<DropdownMenuItem onClick={handleOpenInDrive} className="cursor-pointer">
								<ExternalLink className="mr-2 h-4 w-4" />
								Open in Google Drive
							</DropdownMenuItem>
						)}
						{file.webContentLink && fileType === "file" && (
							<DropdownMenuItem onClick={handleDownload} className="cursor-pointer">
								<Download className="mr-2 h-4 w-4" />
								Download
							</DropdownMenuItem>
						)}
						{file.webViewLink && (
							<DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
								<Copy className="mr-2 h-4 w-4" />
								Copy link
							</DropdownMenuItem>
						)}
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={() => setIsRenameDialogOpen(true)} className="cursor-pointer">
							Rename
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="text-destructive cursor-pointer" onClick={() => setIsDeleteDialogOpen(true)}>
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<DeleteFileDialog
				isOpen={isDeleteDialogOpen}
				onClose={() => setIsDeleteDialogOpen(false)}
				onDelete={handleDelete}
				fileName={file.name}
				fileType={fileType}
			/>

			<RenameFileDialog
				isOpen={isRenameDialogOpen}
				onClose={() => setIsRenameDialogOpen(false)}
				onRename={handleRename}
				currentName={file.name}
				fileType={fileType}
			/>
		</>
	);
}

/**
 * Get modern Lucide React icon for file type
 */
function getModernFileIcon(mimeType?: string, filename?: string) {
	if (!mimeType) {
		if (filename) {
			const ext = filename.split(".").pop()?.toLowerCase();
			return getIconByExtension(ext || "");
		}
		return <FileText className="h-4 w-4 text-blue-500" />;
	}

	// Folder
	if (mimeType === "application/vnd.google-apps.folder") {
		return <Folder className="h-4 w-4 text-blue-500" />;
	}

	// Images
	if (mimeType.startsWith("image/")) {
		return <Image className="h-4 w-4 text-green-500" />;
	}

	// Videos
	if (mimeType.startsWith("video/")) {
		return <Video className="h-4 w-4 text-red-500" />;
	}

	// Audio
	if (mimeType.startsWith("audio/")) {
		return <Music className="h-4 w-4 text-purple-500" />;
	}

	// Google Workspace files
	if (mimeType === "application/vnd.google-apps.document") {
		return <FileText className="h-4 w-4 text-blue-600" />;
	}
	if (mimeType === "application/vnd.google-apps.spreadsheet") {
		return <FileSpreadsheet className="h-4 w-4 text-green-600" />;
	}
	if (mimeType === "application/vnd.google-apps.presentation") {
		return <Presentation className="h-4 w-4 text-orange-500" />;
	}

	// Archive files
	if (isArchiveFile(mimeType)) {
		return <Archive className="h-4 w-4 text-yellow-600" />;
	}

	// Code files
	if (isCodeFile(mimeType, filename)) {
		return <Code className="h-4 w-4 text-green-600" />;
	}

	// Office documents
	if (isOfficeFile(mimeType)) {
		return <FileText className="h-4 w-4 text-blue-500" />;
	}

	// PDF
	if (mimeType === "application/pdf") {
		return <PdfIcon className="h-4 w-4" />;
	}

	// Text files
	if (mimeType.startsWith("text/")) {
		return <FileText className="h-4 w-4 text-gray-600" />;
	}

	// Default
	return <File className="h-4 w-4 text-gray-500" />;
}

/**
 * Get icon by file extension (fallback method)
 */
function getIconByExtension(extension: string) {
	const iconMap: Record<string, JSX.Element> = {
		// Images
		jpg: <Image className="h-4 w-4 text-green-500" />,
		jpeg: <Image className="h-4 w-4 text-green-500" />,
		png: <Image className="h-4 w-4 text-green-500" />,
		gif: <Image className="h-4 w-4 text-green-500" />,
		svg: <Image className="h-4 w-4 text-green-500" />,
		webp: <Image className="h-4 w-4 text-green-500" />,
		// Videos
		mp4: <Video className="h-4 w-4 text-red-500" />,
		avi: <Video className="h-4 w-4 text-red-500" />,
		mov: <Video className="h-4 w-4 text-red-500" />,
		mkv: <Video className="h-4 w-4 text-red-500" />,
		webm: <Video className="h-4 w-4 text-red-500" />,
		// Audio
		mp3: <Music className="h-4 w-4 text-purple-500" />,
		wav: <Music className="h-4 w-4 text-purple-500" />,
		flac: <Music className="h-4 w-4 text-purple-500" />,
		aac: <Music className="h-4 w-4 text-purple-500" />,
		// Documents
		pdf: <PdfIcon className="h-4 w-4" />,
		doc: <FileText className="h-4 w-4 text-blue-500" />,
		docx: <FileText className="h-4 w-4 text-blue-500" />,
		txt: <FileText className="h-4 w-4 text-gray-600" />,
		// Spreadsheets
		xls: <FileSpreadsheet className="h-4 w-4 text-green-600" />,
		xlsx: <FileSpreadsheet className="h-4 w-4 text-green-600" />,
		csv: <FileSpreadsheet className="h-4 w-4 text-green-600" />,
		// Presentations
		ppt: <Presentation className="h-4 w-4 text-orange-500" />,
		pptx: <Presentation className="h-4 w-4 text-orange-500" />,
		// Code
		js: <Code className="h-4 w-4 text-yellow-500" />,
		ts: <Code className="h-4 w-4 text-blue-600" />,
		jsx: <Code className="h-4 w-4 text-cyan-500" />,
		tsx: <Code className="h-4 w-4 text-cyan-600" />,
		html: <Code className="h-4 w-4 text-orange-600" />,
		css: <Code className="h-4 w-4 text-blue-400" />,
		py: <Code className="h-4 w-4 text-yellow-600" />,
		java: <Code className="h-4 w-4 text-red-600" />,
		cpp: <Code className="h-4 w-4 text-blue-700" />,
		c: <Code className="h-4 w-4 text-blue-700" />,
		// Archives
		zip: <Archive className="h-4 w-4 text-yellow-600" />,
		rar: <Archive className="h-4 w-4 text-yellow-600" />,
		"7z": <Archive className="h-4 w-4 text-yellow-600" />,
		tar: <Archive className="h-4 w-4 text-yellow-600" />,
		gz: <Archive className="h-4 w-4 text-yellow-600" />,
	};

	return iconMap[extension] || <File className="h-4 w-4 text-gray-500" />;
}

// Helper functions for file type detection
function isCodeFile(mimeType: string, filename?: string): boolean {
	const codeTypes = [
		"text/javascript",
		"application/javascript",
		"text/html",
		"text/css",
		"application/json",
		"text/xml",
		"application/xml",
	];

	if (codeTypes.includes(mimeType)) {
		return true;
	}

	if (filename) {
		const ext = filename.split(".").pop()?.toLowerCase();
		const codeExtensions = [
			"js",
			"ts",
			"jsx",
			"tsx",
			"html",
			"css",
			"json",
			"xml",
			"py",
			"java",
			"cpp",
			"c",
			"cs",
			"php",
			"rb",
			"go",
			"rs",
			"swift",
			"kt",
			"dart",
		];
		return codeExtensions.includes(ext || "");
	}

	return false;
}

function isOfficeFile(mimeType: string): boolean {
	const officeTypes = [
		"application/msword",
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		"application/vnd.ms-excel",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		"application/vnd.ms-powerpoint",
		"application/vnd.openxmlformats-officedocument.presentationml.presentation",
	];
	return officeTypes.includes(mimeType);
}

function isArchiveFile(mimeType: string): boolean {
	const archiveTypes = [
		"application/zip",
		"application/x-rar-compressed",
		"application/x-7z-compressed",
		"application/x-tar",
		"application/gzip",
	];
	return archiveTypes.includes(mimeType);
}
