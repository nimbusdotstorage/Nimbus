"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

interface CreateFolderDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onCreate: (folderName: string) => Promise<void>;
	parentFolderId?: string;
}

export function CreateFolderDialog({ isOpen, onClose, onCreate, parentFolderId }: CreateFolderDialogProps) {
	const [folderName, setFolderName] = useState("");
	const [isCreating, setIsCreating] = useState(false);

	const handleCreate = async () => {
		if (!folderName.trim()) {
			toast.error("Folder name cannot be empty");
			return;
		}

		setIsCreating(true);
		try {
			await onCreate(folderName.trim());
			toast.success("Folder created successfully");
			setFolderName("");
			onClose();
		} catch (error) {
			console.error("Error creating folder:", error);
			toast.error("Failed to create folder");
		} finally {
			setIsCreating(false);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleCreate();
		}
	};

	const handleClose = () => {
		if (!isCreating) {
			setFolderName("");
			onClose();
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create New Folder</DialogTitle>
					<DialogDescription>
						Enter a name for the new folder.
						{parentFolderId && " It will be created in the current folder."}
					</DialogDescription>
				</DialogHeader>
				<div className="space-y-2">
					<Label htmlFor="folderName">Folder Name</Label>
					<Input
						id="folderName"
						value={folderName}
						onChange={e => setFolderName(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder="Enter folder name"
						disabled={isCreating}
						autoFocus
						className="w-full"
					/>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={handleClose} disabled={isCreating}>
						Cancel
					</Button>
					<Button onClick={handleCreate} disabled={isCreating || !folderName.trim()}>
						{isCreating ? "Creating..." : "Create Folder"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
