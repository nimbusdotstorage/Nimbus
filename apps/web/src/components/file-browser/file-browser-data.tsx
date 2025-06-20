import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UploadFolderDialog } from "@/components/dialogs/upload-folder-dialog";
import { CreateFolderDialog } from "@/components/dialogs/create-folder-dialog";
import { UploadFileDialog } from "@/components/dialogs/upload-files-dialog";
import { FileText, Folder, MoreVertical, Image } from "lucide-react";
import { useFileOperations } from "@/hooks/useFileOperations";
import { EmptyState } from "@/components/ui/empty-state";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useUpload } from "@/hooks/useUpload";
import type { FileItem } from "@/lib/types";
import { toast } from "sonner";
import Link from "next/link";

// TODO: Typing of the file data needs to be updated
export function FileBrowserData({ data, type }: { data: FileItem[]; type?: string | null }) {
	return <FilesList data={data} type={type} />;
}

function FilesList({ data, type }: { data: FileItem[]; type?: string | null }) {
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
									{file.type === "folder" ? (
										<Folder className="text-primary h-4 w-4" />
									) : (
										<FileText className="text-primary h-4 w-4" />
									)}
									{file.name}
								</td>
								<td className="text-muted-foreground p-3 text-sm">{file.modified}</td>
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
