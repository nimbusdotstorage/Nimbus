import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import type React from "react";

interface CreateFolderDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onCreateFolder: (folderName: string) => void;
}

export function CreateFolderDialog({ open, onOpenChange, onCreateFolder }: CreateFolderDialogProps) {
	const [folderName, setFolderName] = useState("");

	const handleCreateFolder = (event: FormEvent) => {
		event.preventDefault();
		if (!folderName.trim()) return;

		onCreateFolder(folderName.trim());
		toast.success("Folder created successfully");
		onOpenChange(false);
		setFolderName("");
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="rounded-2xl shadow-xl sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="text-xl font-semibold">Create a New Folder</DialogTitle>
					<DialogDescription className="text-muted-foreground text-sm">
						Give your folder a meaningful name.
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleCreateFolder} className="space-y-6">
					<div className="grid gap-2">
						<Label htmlFor="folder-name" className="text-sm font-medium">
							Folder Name
						</Label>
						<Input
							id="folder-name"
							placeholder="e.g., Project Documents"
							value={folderName}
							onChange={e => setFolderName(e.target.value)}
							required
							className="focus-visible:ring-ring focus-visible:ring-2"
							maxLength={255}
						/>
					</div>

					<DialogFooter className="flex justify-between">
						<Button
							type="button"
							variant="ghost"
							onClick={() => onOpenChange(false)}
							className="text-muted-foreground hover:text-foreground cursor-pointer"
						>
							Cancel
						</Button>
						<Button type="submit" disabled={!folderName.trim()} className="cursor-pointer">
							Create
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
