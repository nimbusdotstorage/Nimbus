import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useFileActions } from "@/web/hooks/useFileActions";
import { Button } from "@/components/ui/button";
import { parseError } from "@/web/utils/error";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface DeleteDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onDelete: () => void;
	itemName: string;
	itemType: "file" | "folder";
}

export function DeleteDialog({ open, onOpenChange, onDelete, itemName, itemType }: DeleteDialogProps) {
	const { setSelectedItem } = useFileActions();

	const handleDelete = async () => {
		try {
			await onDelete();
			setSelectedItem(null);
			toast.success(`${itemType === "folder" ? "Folder" : "File"} deleted successfully`);
			onOpenChange(false);
		} catch (err) {
			toast.error(parseError(err) ?? "Failed to delete");
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="rounded-2xl shadow-xl sm:max-w-md">
				<DialogHeader>
					<div className="flex items-center gap-3">
						<div className="rounded-full bg-red-100 p-2 dark:bg-red-900/20">
							<Trash2 className="h-5 w-5 text-red-600 dark:text-red-400" />
						</div>
						<div>
							<DialogTitle className="text-xl font-semibold">
								Delete {itemType === "folder" ? "Folder" : "File"}
							</DialogTitle>
							<DialogDescription className="text-muted-foreground text-sm">
								Are you sure you want to delete &quot;{itemName}&quot;?
							</DialogDescription>
						</div>
					</div>
				</DialogHeader>

				<div className="text-muted-foreground mt-4 text-sm">
					This action cannot be undone. This will permanently delete this {itemType}
					and remove all associated data.
				</div>

				<DialogFooter className="mt-6 flex justify-between">
					<Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="cursor-pointer">
						Cancel
					</Button>
					<Button type="button" variant="destructive" onClick={handleDelete} className="cursor-pointer">
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
