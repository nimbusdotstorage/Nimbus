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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { FileItem } from "@/lib/types";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface RenameFileDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	file: FileItem | null;
	onFileRenamed?: (fileId: string, newName: string) => void;
}

// Helper function to extract filename and extension
const getFileNameParts = (fileName: string) => {
	const lastDotIndex = fileName.lastIndexOf(".");
	if (lastDotIndex === -1 || lastDotIndex === 0) {
		// No extension or hidden file
		return { name: fileName, extension: "" };
	}
	return {
		name: fileName.substring(0, lastDotIndex),
		extension: fileName.substring(lastDotIndex),
	};
};

export function RenameFileDialog({ open, onOpenChange, file, onFileRenamed }: RenameFileDialogProps) {
	const [newName, setNewName] = useState("");
	const [isRenaming, setIsRenaming] = useState(false);

	// Update the newName when file changes or dialog opens
	useEffect(() => {
		if (file && open) {
			const { name } = getFileNameParts(file.name);
			setNewName(name);
		}
	}, [file, open]);

	// Reset state when dialog closes
	useEffect(() => {
		if (!open) {
			setNewName("");
			setIsRenaming(false);
		}
	}, [open]);

	const handleRename = async (values: { name: string }) => {
		if (!file) return;

		setIsRenaming(true);
		try {
			// Reconstruct full filename
			let fullName = values.name;
			const { extension } = getFileNameParts(file.name);
			const isFolder = file.mimeType === "application/vnd.google-apps.folder";
			if (!isFolder && extension) {
				fullName = `${values.name}${extension}`;
			}

			const response = await fetch(
				`${clientEnv.NEXT_PUBLIC_BACKEND_URL}/api/files?id=${file.id}&name=${encodeURIComponent(fullName)}`,
				{
					method: "PUT",
					credentials: "include",
				}
			);

			if (!response.ok) {
				throw new Error("Failed to rename file");
			}

			// Show success notification
			toast.success(isFolder ? `Folder ${fullName} renamed successfully` : `File ${fullName} renamed successfully`);

			onFileRenamed?.(file.id, fullName);
			onOpenChange(false);
		} catch (error) {
			console.error("Error renaming file:", error);
			// Show error notification
			toast.error(isFolder ? `Failed to rename folder ${file.name}` : `Failed to rename file ${file.name}`);
		} finally {
			setIsRenaming(false);
		}
	};

	const handleSubmit = (values: { name: string }) => {
		void handleRename(values);
	};

	const isFolder = file?.mimeType === "application/vnd.google-apps.folder";
	const fileExtension = file ? getFileNameParts(file.name).extension : "";

	return (
		<Dialog open={open} onOpenChange={open => !isRenaming && onOpenChange(open)}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Rename {isFolder ? "Folder" : "File"}</DialogTitle>
					<DialogDescription>
						{file && fileExtension ? (
							<>
								Enter a new name for {file.name}.
								<br />
								<span className="text-muted-foreground text-xs">File extension {fileExtension} will be preserved.</span>
							</>
						) : (
							`Enter a new name for ${file?.name}.`
						)}
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid gap-2">
						<Label htmlFor="new-name">Name</Label>
						<div className="flex items-center gap-2">
							<Input
								id="new-name"
								value={newName}
								onChange={e => setNewName(e.target.value)}
								placeholder="Enter new name"
								disabled={isRenaming}
								onKeyDown={e => {
									if (e.key === "Enter" && !isRenaming && newName.trim()) {
										handleSubmit({ name: newName });
									}
								}}
								className="flex-1"
							/>
							{fileExtension && (
								<span className="text-muted-foreground bg-muted rounded px-2 py-2 text-sm">{fileExtension}</span>
							)}
						</div>
					</div>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={() => onOpenChange(false)} disabled={isRenaming}>
						Cancel
					</Button>
					<Button onClick={() => handleSubmit({ name: newName })} disabled={isRenaming || !newName.trim()}>
						{isRenaming ? "Renaming..." : "Rename"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
