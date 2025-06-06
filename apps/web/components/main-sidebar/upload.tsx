import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { Upload, FolderOpen, ChevronDown, File } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UploadButton() {
	return (
		<SidebarGroup>
			<SidebarGroupContent>
				<div className="space-y-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								className="w-full cursor-pointer justify-start group-data-[collapsible=icon]:justify-center"
								size="sm"
							>
								<Upload className="mr-2 size-4 group-data-[collapsible=icon]:mr-0" />
								<span className="group-data-[collapsible=icon]:hidden">Upload</span>
								<ChevronDown className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start" className="w-48">
							<DropdownMenuItem className="cursor-pointer">
								<File className="mr-2 size-4" />
								Upload Files
							</DropdownMenuItem>
							<DropdownMenuItem className="cursor-pointer">
								<FolderOpen className="mr-2 size-4" />
								Upload Folder
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
