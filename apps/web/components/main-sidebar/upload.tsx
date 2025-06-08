import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Upload, FolderOpen, ChevronDown, File, FolderPlus } from "lucide-react";
import { UploadFileDialog } from "@/components/dialogs/upload-files-dialog";
import { UploadFolderDialog } from "@/components/dialogs/upload-folder-dialog";
import { CreateFolderDialog } from "@/components/dialogs/create-folder-dialog";
import { useUpload } from "@/hooks/useUpload";

export default function UploadButton() {
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
		<SidebarGroup>
			<SidebarGroupContent>
				<div className="space-y-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								className="w-full justify-start group-data-[collapsible=icon]:justify-center cursor-pointer"
								size="sm"
							>
								<Upload className="mr-2 size-4 group-data-[collapsible=icon]:mr-0" />
								<span className="group-data-[collapsible=icon]:hidden">Upload</span>
								<ChevronDown className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={() => setUploadFileOpen(true)} className="cursor-pointer">
								<File className="mr-2 size-4" />
								Upload files
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setUploadFolderOpen(true)} className="cursor-pointer">
								<FolderOpen className="mr-2 size-4" />
								Upload folder
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setCreateFolderOpen(true)} className="cursor-pointer">
								<FolderPlus className="mr-2 size-4" />
								Create folder
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<UploadFileDialog open={uploadFileOpen} onOpenChange={setUploadFileOpen} onUpload={handleFileUpload} />

					<UploadFolderDialog
						open={uploadFolderOpen}
						onOpenChange={setUploadFolderOpen}
						onUpload={handleFolderUpload}
					/>

					<CreateFolderDialog
						open={createFolderOpen}
						onOpenChange={setCreateFolderOpen}
						onCreateFolder={handleCreateFolder}
					/>
				</div>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
