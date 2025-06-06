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
								<SidebarMenuButton tooltip="Starred" className="cursor-pointer">
									<Star className="size-4 text-yellow-500 dark:text-yellow-500" />
									<span>Starred</span>
									<span className="text-sidebar-foreground/70 ml-auto text-xs">23</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</CollapsibleContent>
			</SidebarGroup>
		</Collapsible>
	);
}
