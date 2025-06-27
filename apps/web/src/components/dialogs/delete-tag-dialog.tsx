import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Tag } from "@/lib/types";

interface DeleteTagDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onDelete: (id: string) => void;
	tag: Tag | null;
}

export function DeleteTagDialog({ isOpen, onClose, onDelete, tag }: DeleteTagDialogProps) {
	if (!tag) {
		return null;
	}

	const handleSubmit = () => {
		onDelete(tag.id);
		onClose();
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete Tag</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete the tag {tag.name} ? Be aware that this will delete all of its children as
						well. This action cannot be undone.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button variant="destructive" onClick={handleSubmit}>
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
