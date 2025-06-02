import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenuItem,
	SidebarMenu,
	SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const tags = [
	{ name: "Important", color: "bg-red-500", count: 12 },
	{ name: "Work", color: "bg-blue-500", count: 28 },
	{ name: "Personal", color: "bg-green-500", count: 15 },
	{ name: "Project", color: "bg-purple-500", count: 9 },
	{ name: "Archive", color: "bg-gray-500", count: 6 },
];

// TODO: Get data from API, be able to edit tags( add, delete, color change, rename), add popup for these funcitons (with keyboard shortcuts)
export default function TagMenu() {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>
				Tags
				<Button variant="ghost" size="icon" className="ml-auto h-6 w-6 ">
					<Plus className="size-3" />
					<span className="sr-only">Add Tag</span>
				</Button>
			</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu>
					{tags.map(tag => (
						<SidebarMenuItem key={tag.name} className="group/item">
							<SidebarMenuButton
								className="flex items-center w-full peer pl-3 group-data-[collapsible=icon]:justify-center justify-between"
								tooltip={`${tag.name} (${tag.count})`}
							>
								<div className="flex items-center gap-1">
									<span className={`size-3 rounded-full ${tag.color}`} />
									<span className="ml-2 group-data-[collapsible=icon]:hidden">{tag.name}</span>
									<span className="ml-2 text-xs text-sidebar-foreground/70 group-data-[collapsible=icon]:hidden">
										{tag.count}
									</span>
								</div>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<div className="px-1.5 opacity-0 group-hover/item:opacity-100 group-data-[collapsible=icon]:hidden">
											<MoreHorizontal className="size-3" />
											<span className="sr-only">Tag options</span>
										</div>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuItem>Edit Tag</DropdownMenuItem>
										<DropdownMenuItem>Change Color</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem className="text-destructive">Delete Tag</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
