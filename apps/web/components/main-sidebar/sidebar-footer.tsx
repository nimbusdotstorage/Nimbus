import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SidebarFooter } from "@/components/ui/sidebar";

// TODO: Get actualy data from api, fix collapsed styling
export default function StorageFooter() {
	const storageUsed = 69;
	return (
		<SidebarFooter>
			<div className="p-2">
				<div className="rounded-lg bg-sidebar-accent p-3">
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
			</div>
		</SidebarFooter>
	);
}
