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
import { fileSize } from "@/lib/utils";
import Link from "next/link";

// TODO: Typing of the file data needs to be updated
export function FileBrowserData({ data }: { data: FileItem[] }) {
	return <FilesList data={data} />;
}

function FilesList({ data }: { data: FileItem[] }) {
	const searchParams = useSearchParams();

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
						const size = file.size ? fileSize(file.size) : "—";
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
								<td className="text-muted-foreground p-3 text-sm">{size}</td>
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

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" className="relative h-8 w-8">
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
						handleDeleteFile(id);
					}}
				>
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
