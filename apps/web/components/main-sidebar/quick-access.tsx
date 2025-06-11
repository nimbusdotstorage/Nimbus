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
			<SidebarGroupLabel>Quick Access</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton tooltip="Starred" className="px-3">
							<Star className="size-4 text-yellow-500 dark:text-yellow-500" />
							<span>Starred</span>
							<span className="text-sidebar-foreground/70 ml-1 text-xs">23</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
