import {
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarMenu,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Star } from "lucide-react";
import { useState } from "react";

export function QuickAccess() {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>Quick Access</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton tooltip="Starred" className="px-3">
							<Star className="size-4 dark:text-yellow-500 text-yellow-500" />
							<span>Starred</span>
							<span className="ml-1 text-xs text-sidebar-foreground/70">23</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
