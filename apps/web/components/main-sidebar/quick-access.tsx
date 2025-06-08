import {
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarMenu,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Star } from "lucide-react";

export function QuickAccess() {
	return (
		<SidebarGroup>
			<SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">Quick Access</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton tooltip="Starred" className="px-3">
							<Star className="size-4 dark:text-yellow-500 text-yellow-500" />
							<span className="group-data-[collapsible=icon]:hidden">Starred</span>
							<span className="ml-1 text-xs text-sidebar-foreground/70 group-data-[collapsible=icon]:hidden">23</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
