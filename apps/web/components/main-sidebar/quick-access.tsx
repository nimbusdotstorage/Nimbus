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
import { useState } from "react";
import { Star } from "lucide-react";

export function QuickAccess() {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<Collapsible onOpenChange={setIsOpen}>
			<SidebarGroup>
				<CollapsibleTrigger>
					<SidebarGroupLabel>
						Quick Access
						<ChevronDown className={`ml-auto size-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
					</SidebarGroupLabel>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton tooltip="Starred">
									<Star className="size-4 dark:text-yellow-500 text-yellow-500" />
									<span>Starred</span>
									<span className="ml-auto text-xs text-sidebar-foreground/70">23</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</CollapsibleContent>
			</SidebarGroup>
		</Collapsible>
	);
}
