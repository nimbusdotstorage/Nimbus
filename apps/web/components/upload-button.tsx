"use client";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UploadFolderDialog } from "@/components/dialogs/upload-folder-dialog";
import { CreateFolderDialog } from "@/components/dialogs/create-folder-dialog";
import { UploadFileDialog } from "@/components/dialogs/upload-files-dialog";
import { Upload, Plus, FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUpload } from "@/hooks/useUpload";
import type React from "react";

export function UploadButton() {
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

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="icon" className="cursor-pointer">
						<Plus className="h-4 w-4" />
						<span className="sr-only">Open menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem onClick={() => setUploadFileOpen(true)} className="cursor-pointer">
						<Upload className="mr-2 h-4 w-4" />
						Upload files
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setUploadFolderOpen(true)} className="cursor-pointer">
						<Upload className="mr-2 h-4 w-4" />
						Upload folder
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setCreateFolderOpen(true)} className="cursor-pointer">
						<FolderPlus className="mr-2 h-4 w-4" />
						Create folder
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<UploadFileDialog open={uploadFileOpen} onOpenChange={setUploadFileOpen} onUpload={handleFileUpload} />

			<UploadFolderDialog open={uploadFolderOpen} onOpenChange={setUploadFolderOpen} onUpload={handleFolderUpload} />

			<CreateFolderDialog
				open={createFolderOpen}
				onOpenChange={setCreateFolderOpen}
				onCreateFolder={handleCreateFolder}
			/>
		</>
	);
}
