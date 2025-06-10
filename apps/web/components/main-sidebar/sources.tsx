import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Plus, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ComponentType } from "react";

export interface Source {
	name: string;
	icon: ComponentType<{ className?: string }>;
	value: string;
	backgroundColor: string;
	textColor?: string;
}

// ! This is a temporary implementation, will need to figure out the data to be passed from API
export default function Sources({
	selectedSource,
	setSelectedSource,
	fileSources,
}: {
	selectedSource: Source;
	setSelectedSource: (source: Source) => void;
	fileSources: Source[];
}) {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							tooltip="File Source"
							className={`${selectedSource?.backgroundColor ? `data-[state=open]:${selectedSource.backgroundColor}` : ""} data-[state=open]:text-sidebar-accent-foreground cursor-pointer`}
						>
							<div
								className={`flex aspect-square size-8 items-center justify-center rounded-lg ${selectedSource?.backgroundColor} text-sidebar-primary-foreground`}
							>
								{selectedSource?.icon && <selectedSource.icon className={`size-6 ${selectedSource?.textColor}`} />}
							</div>
							<div className="flex flex-col gap-0.5 leading-none">
								<span className="font-semibold">{selectedSource?.name}</span>
								<span className="text-xs">File Source</span>
							</div>
							<ChevronDown className="ml-auto" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="mx-2 w-full" align="start" side="bottom">
						<DropdownMenuLabel className="flex flex-row items-center">
							Sources
							<Button variant="secondary" size="icon" className="ml-auto h-6 w-6 cursor-pointer p-0">
								<Plus className="size-4" />
								<span className="sr-only">Add Source</span>
							</Button>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						{fileSources.map(source => (
							<DropdownMenuItem
								key={source.value}
								onSelect={() => setSelectedSource(source)}
								className="cursor-pointer"
							>
								<source.icon className="mr-2 h-4 w-4" />
								<span>{source.name}</span>
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
