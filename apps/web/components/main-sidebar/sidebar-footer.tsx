import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SidebarFooter } from "@/components/ui/sidebar";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

// TODO: Get actual data from api, fix collapsed styling
export default function StorageFooter() {
	const storageUsed = 69;
	return (
		<SidebarFooter className="transition-all duration-200 ease-linear">
			<div className="p-2 group-data-[collapsible=icon]:p-0 transition-all duration-200 ease-linear">
				{/* Standard view - shown when expanded */}
				<div className="rounded-lg bg-sidebar-accent p-3 transition-opacity duration-200 ease-linear opacity-100 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:pointer-events-none group-data-[collapsible=icon]:hidden">
					<div className="flex items-center justify-between text-sm font-medium">
						<span>Storage</span>
						<span>{storageUsed}% used</span>
					</div>
					<Progress value={storageUsed} className="mt-2 h-2" />
					<div className="mt-2 flex justify-between text-xs text-sidebar-foreground/70">
						<span>6.9 GB of 10 GB used</span>
						<Button variant="link" size="sm" className="h-auto p-0 text-xs">
							Upgrade
						</Button>
					</div>
				</div>

				{/* Circular view - shown when collapsed with tooltip */}
				<Tooltip>
					<TooltipTrigger asChild>
						<div className="hidden group-data-[collapsible=icon]:flex transition-opacity duration-200 ease-linear opacity-0 group-data-[collapsible=icon]:opacity-100 group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:relative group-data-[collapsible=icon]:rounded-lg group-data-[collapsible=icon]:bg-sidebar-accent group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:items-center">
							<svg className="group-data-[collapsible=icon]:size-6 -rotate-90" viewBox="0 0 48 48">
								<circle
									cx="24"
									cy="24"
									r="20"
									fill="none"
									stroke="currentColor"
									strokeOpacity="0.2"
									strokeWidth="4"
									pathLength="100"
								/>
								<circle
									cx="24"
									cy="24"
									r="20"
									fill="none"
									stroke="currentColor"
									strokeWidth="4"
									pathLength="100"
									strokeDasharray={`${storageUsed} 100`}
								/>
							</svg>
						</div>
					</TooltipTrigger>
					<TooltipContent side="right" sideOffset={4}>
						<span className="text-xs">{storageUsed}% used</span>
					</TooltipContent>
				</Tooltip>
			</div>
		</SidebarFooter>
	);
}
