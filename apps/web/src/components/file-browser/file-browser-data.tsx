import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileText, Folder, MoreVertical, Image, Video, Music } from "lucide-react";
import { UploadFolderDialog } from "@/components/dialogs/upload-folder-dialog";
import { CreateFolderDialog } from "@/components/dialogs/create-folder-dialog";
import { UploadFileDialog } from "@/components/dialogs/upload-files-dialog";
import { useFileOperations } from "@/hooks/useFileOperations";
import { EmptyState } from "@/components/ui/empty-state";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useUpload } from "@/hooks/useUpload";
import { List, Grid3X3 } from "lucide-react";
import type { FileItem } from "@/lib/types";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

// TODO: Typing of the file data needs to be updated
export function FileBrowserData({ data, type }: { data: FileItem[]; type?: string | null }) {
	const [view, setView] = useState<"table" | "grid">("table");
	console.log(data);
	return <FilesList data={data} type={type} view={view} setView={setView} />;
}

function ViewToggle({ view, onViewChange }: { view: "table" | "grid"; onViewChange: (v: "table" | "grid") => void }) {
	return (
		<div className="flex items-center rounded-md border p-1">
			<Button
				variant={view === "table" ? "secondary" : "ghost"}
				size="sm"
				onClick={() => onViewChange("table")}
				className="h-7 px-2"
			>
				<List className="h-4 w-4" />
				<span className="sr-only">Table view</span>
			</Button>
			<Button
				variant={view === "grid" ? "secondary" : "ghost"}
				size="sm"
				onClick={() => onViewChange("grid")}
				className="h-7 px-2"
			>
				<Grid3X3 className="h-4 w-4" />
				<span className="sr-only">Grid view</span>
			</Button>
		</div>
	);
}

function FilesGrid({ data }: { data: FileItem[] }) {
	const folders = data.filter(file => file.type === "folder" || file.mimeType === "application/vnd.google-apps.folder");
	const files = data.filter(file => file.type !== "folder" && file.mimeType !== "application/vnd.google-apps.folder");

	const getFileIcon = (type: string, size = "h-5 w-5") => {
		if (type === "application/vnd.google-apps.folder") {
			return <Folder className={`text-gray-700 dark:text-gray-400 ${size}`} />;
		}
		if (type.startsWith("image/")) {
			return <Image className={`text-green-500 ${size}`} />;
		}
		if (type.startsWith("video/")) {
			return <Video className={`text-purple-500 ${size}`} />;
		}
		if (type.startsWith("audio/")) {
			return <Music className={`text-orange-500 ${size}`} />;
		}
		return <FileText className={`text-blue-500 ${size}`} />; // Default document icon
	};

	const FolderCard = ({ file }: { file: FileItem }) => (
		<div className="group bg-card text-card-foreground relative flex cursor-pointer items-center justify-between rounded-lg border p-3 shadow-sm transition-shadow hover:shadow-md">
			<div className="flex items-center gap-3">
				{getFileIcon(file.mimeType || file.type)}
				<span className="text-sm font-medium">{file.name}</span>
			</div>
			<div className="opacity-0 transition-opacity group-hover:opacity-100">
				<FileActions id={file.id} />
			</div>
		</div>
	);

	const FileCard = ({ file }: { file: FileItem }) => (
		<div className="group bg-card text-card-foreground relative cursor-pointer overflow-hidden rounded-lg border shadow-sm transition-shadow hover:shadow-md">
			<div className="bg-muted flex h-32 items-center justify-center">
				{getFileIcon(file.mimeType || file.type, "h-12 w-12")}
			</div>
			<div className="p-3">
				<div className="flex items-start justify-between">
					<h3 className="truncate text-sm leading-tight font-medium">{file.name}</h3>
					<div className="-mt-1 opacity-0 transition-opacity group-hover:opacity-100">
						<FileActions id={file.id} />
					</div>
				</div>
				{file.size && <p className="text-muted-foreground mt-1 text-xs">{file.size}</p>}
				<p className="text-muted-foreground mt-1 text-xs">
					Modified {new Date(file.modifiedTime).toLocaleDateString()}
				</p>
			</div>
		</div>
	);

	return (
		<div className="space-y-8">
			{folders.length > 0 && (
				<div>
					<h2 className="mb-4 text-lg font-semibold">Folders</h2>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						{folders.map(folder => (
							<FolderCard key={folder.id} file={folder} />
						))}
					</div>
				</div>
			)}

			{files.length > 0 && (
				<div>
					<h2 className="mb-4 text-lg font-semibold">Files</h2>
					<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
						{files.map(file => (
							<FileCard key={file.id} file={file} />
						))}
					</div>
				</div>
			)}
		</div>
	);
}

function FilesList({
	data,
	type,
	view,
	setView,
}: {
	data: FileItem[];
	type?: string | null;
	view: "table" | "grid";
	setView: (v: "table" | "grid") => void;
}) {
	const searchParams = useSearchParams();
	const {
		uploadFileOpen,
		uploadFolderOpen,
		createFolderOpen,
		setUploadFileOpen,
		setUploadFolderOpen,
		setCreateFolderOpen,
		handleFileUpload,
		handleFolderUpload,
		handleCreateFolder,
	} = useUpload();

	if (!data || data.length === 0) {
		let icon = <Folder />;
		let title = "No files or folders added";
		let description =
			"Upload files or create a new folder to get started. You can organize and preview your content here.";
		let executeAction = <Button onClick={() => setUploadFileOpen(true)}>Upload files</Button>;

		if (type === "media") {
			icon = <Image className="text-neutral-500" />;
			title = "No media files found";
			description = "Upload images, videos, or music to see them here.";
			executeAction = <Button onClick={() => setUploadFileOpen(true)}>Upload media</Button>;
		} else if (type === "document") {
			icon = <FileText className="text-neutral-500" />;
			title = "No documents found";
			description = "Upload your documents to access and manage them from anywhere.";
			executeAction = <Button onClick={() => setUploadFileOpen(true)}>Upload documents</Button>;
		} else if (type === "folder") {
			icon = <Folder className="text-neutral-500" />;
			title = "No folders found";
			description = "Create folders to better organize your files.";
			executeAction = <Button onClick={() => setCreateFolderOpen(true)}>Create folder</Button>;
		}

		return (
			<>
				<div className="mb-2 flex items-center justify-end">
					<ViewToggle view={view} onViewChange={setView} />
				</div>
				<EmptyState icon={icon} title={title} description={description} executeAction={executeAction} />

				<UploadFileDialog open={uploadFileOpen} onOpenChange={setUploadFileOpen} onUpload={handleFileUpload} />
				<UploadFolderDialog open={uploadFolderOpen} onOpenChange={setUploadFolderOpen} onUpload={handleFolderUpload} />
				<CreateFolderDialog
					open={createFolderOpen}
					onOpenChange={setCreateFolderOpen}
					onCreateFolder={(name, parentId) => handleCreateFolder(name, parentId)}
				/>
			</>
		);
	}

	return (
		<>
			<div className="mb-2 flex items-center justify-end">
				<ViewToggle view={view} onViewChange={setView} />
			</div>
			{view === "table" ? (
				<div className="overflow-hidden rounded-md border">
					<table className="w-full">
						<thead className="text-muted-foreground bg-muted/50 text-left text-xs font-medium">
							<tr>
								<th className="p-3">Name</th>
								<th className="p-3">Modified</th>
								<th className="p-3">Size</th>
								<th className="p-3">Actions</th>
							</tr>
						</thead>
						<tbody>
							{data.map(file => {
								const params = new URLSearchParams(searchParams.toString());
								params.set("id", file.id);

								return (
									<tr key={file.id} className="hover:bg-accent/10 relative cursor-pointer border-t transition-colors">
										<td className="flex items-center gap-2 p-4">
											<Link href={"?" + params.toString()} className="absolute inset-0" />
											{file.type === "folder" || file.mimeType === "application/vnd.google-apps.folder" ? (
												<Folder className="text-primary h-4 w-4" />
											) : (
												<FileText className="text-primary h-4 w-4" />
											)}
											{file.name}
										</td>
										<td className="text-muted-foreground p-3 text-sm">
											{new Date(file.modifiedTime).toLocaleDateString()}
										</td>
										<td className="text-muted-foreground p-3 text-sm">{file.size || "—"}</td>
										<td className="p-3">
											<FileActions id={file.id} />
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			) : (
				<FilesGrid data={data} />
			)}
		</>
	);
}

function FileActions({ id }: { id: string }) {
	const { handleDeleteFile } = useFileOperations();

	const handleDelete = () => {
		handleDeleteFile(id);
		toast.success("File deleted successfully");
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" className="relative h-8 w-8" aria-label="Open file actions menu">
					<MoreVertical className="h-4 w-4" />
					<span className="sr-only">Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem>Open</DropdownMenuItem>
				<DropdownMenuItem>Share</DropdownMenuItem>
				<DropdownMenuItem>Download</DropdownMenuItem>
				<DropdownMenuItem>Rename</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="text-destructive"
					onClick={e => {
						e.preventDefault();
						handleDelete();
					}}
					aria-label="Delete file"
				>
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
