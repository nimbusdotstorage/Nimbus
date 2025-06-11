import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Folder, Search, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { parseError } from "@/web/utils/error";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface Destination {
	id: string;
	name: string;
	path: string;
}

interface MoveDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onMove: (destinationId: string) => void;
	itemName: string;
	itemType: "file" | "folder";
}

// Dummy destinations data
const DESTINATIONS: Destination[] = [
	{ id: "1", name: "Documents", path: "/Documents" },
	{ id: "2", name: "Images", path: "/Images" },
	{ id: "3", name: "Projects", path: "/Projects" },
	{ id: "4", name: "Archive", path: "/Archive" },
	{ id: "5", name: "Downloads", path: "/Downloads" },
	{ id: "6", name: "Work", path: "/Work" },
	{ id: "7", name: "Personal", path: "/Personal" },
];

export function MoveDialog({ open, onOpenChange, onMove, itemName, itemType }: MoveDialogProps) {
	const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState("");

	// Reset state when the dialog closes
	useEffect(() => {
		if (!open) {
			setSelectedDestination(null);
			setSearchQuery("");
		}
	}, [open]);

	const filteredDestinations = DESTINATIONS.filter(
		destination =>
			destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			destination.path.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const handleMove = async () => {
		if (!selectedDestination) return;

		try {
			await onMove(selectedDestination);
			toast.success(`${itemType === "folder" ? "Folder" : "File"} moved successfully`);
			onOpenChange(false);
		} catch (err) {
			toast.error(parseError(err) ?? "Failed to move");
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="rounded-2xl shadow-xl sm:max-w-md">
				<DialogHeader>
					<div className="flex items-center gap-3">
						<div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/20">
							<MoveRight className="h-5 w-5 text-blue-600 dark:text-blue-400" />
						</div>
						<div>
							<DialogTitle className="text-xl font-semibold">
								Move {itemType === "folder" ? "Folder" : "File"}
							</DialogTitle>
							<DialogDescription className="text-muted-foreground text-sm">
								Select a destination to move &quot;{itemName}&quot;
							</DialogDescription>
						</div>
					</div>
				</DialogHeader>

				<div className="relative my-4">
					<Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
					<Input
						placeholder="Search locations..."
						className="pl-9"
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
					/>
				</div>

				<div className="my-4 max-h-60 overflow-y-auto rounded-md border">
					<div className="space-y-0.5 p-1">
						{filteredDestinations.length > 0 ? (
							filteredDestinations.map(destination => (
								<div
									key={destination.id}
									className={`flex cursor-pointer items-center rounded-md p-2 transition-colors ${
										selectedDestination === destination.id ? "bg-primary text-primary-foreground" : "hover:bg-accent"
									}`}
									onClick={() => setSelectedDestination(destination.id)}
								>
									<Folder className="mr-2 h-5 w-5 flex-shrink-0" />
									<div className="overflow-hidden">
										<p className="truncate font-medium">{destination.name}</p>
										<p className="truncate text-xs opacity-70">{destination.path}</p>
									</div>
								</div>
							))
						) : (
							<div className="text-muted-foreground p-4 text-center text-sm">No matching locations found</div>
						)}
					</div>
				</div>

				<DialogFooter className="flex justify-between">
					<Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="cursor-pointer">
						Cancel
					</Button>
					<Button type="button" onClick={handleMove} disabled={!selectedDestination} className="cursor-pointer">
						Move
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
