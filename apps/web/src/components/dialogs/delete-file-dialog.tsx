import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { clientEnv } from "@/lib/env/client-env";
import { Button } from "@/components/ui/button";
import type { FileItem } from "@/lib/types";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteFileDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	file: FileItem | null;
	onFileDeleted?: (fileId: string) => void;
}

export function DeleteFileDialog({ open, onOpenChange, file, onFileDeleted }: DeleteFileDialogProps) {
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDelete = async () => {
		if (!file) return;

		setIsDeleting(true);

		try {
			const response = await fetch(`${clientEnv.NEXT_PUBLIC_BACKEND_URL}/api/files?id=${file.id}`, {
				method: "DELETE",
				credentials: "include",
			});

			if (response.ok) {
				onFileDeleted?.(file.id);
				onOpenChange(false);

				// Show success notification
				const isFolder = file.mimeType === "application/vnd.google-apps.folder";
				toast.success(`${isFolder ? "Folder" : "File"} ${file.name} deleted successfully`);
			} else {
				const error = await response.json();
				console.error("Delete failed:", error);
				toast.error("Failed to delete: " + (error.message || "Unknown error"));
			}
		} catch (error) {
			console.error("Delete error:", error);
			toast.error("Failed to delete file");
		} finally {
			setIsDeleting(false);
		}
	};

	const isFolder = file?.mimeType === "application/vnd.google-apps.folder";

	return (
		<Dialog open={open} onOpenChange={open => !isDeleting && onOpenChange(open)}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete {isFolder ? "Folder" : "File"}</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete {file?.name}? This action cannot be undone.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={() => onOpenChange(false)} disabled={isDeleting}>
						Cancel
					</Button>
					<Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
						{isDeleting ? "Deleting..." : "Delete"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
