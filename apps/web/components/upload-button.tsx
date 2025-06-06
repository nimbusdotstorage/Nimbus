import { Plus, Upload } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function UploadButton() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className="cursor-pointer gap-2">
					<Plus className="h-4 w-4" />
					New
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuGroup>
					<DropdownMenuItem className="cursor-pointer">
						<Upload className="mr-2 h-4 w-4" />
						Upload file
					</DropdownMenuItem>
					<DropdownMenuItem className="cursor-pointer">
						<Upload className="mr-2 h-4 w-4" />
						Upload folder
					</DropdownMenuItem>
					<DropdownMenuItem className="cursor-pointer">
						<Folder className="mr-2 h-4 w-4" />
						Create folder
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { Folder } from "lucide-react";
