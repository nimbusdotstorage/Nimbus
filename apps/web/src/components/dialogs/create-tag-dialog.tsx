import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import type { Tag } from "@/lib/types";
import { type ReactNode } from "react";

function renderTagOptions(tags: Tag[], level = 0): ReactNode[] {
	return tags.flatMap(tag => [
		<option key={tag.id} value={tag.id}>
			{"\u00A0".repeat(level * 2)}
			{tag.name}
		</option>,
		...(tag.children ? renderTagOptions(tag.children, level + 1) : []),
	]);
}

interface CreateTagDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onCreate: (data: { name: string; color: string; parentId?: string }) => void;
	tags: Tag[];
	initialParentId?: string;
}

export function CreateTagDialog({ isOpen, onClose, onCreate, tags, initialParentId }: CreateTagDialogProps) {
	const [name, setName] = useState("");
	const [color, setColor] = useState("#808080");
	const [parentId, setParentId] = useState<string | undefined>(undefined);

	useEffect(() => {
		if (isOpen) {
			setParentId(initialParentId);
		} else {
			setName("");
			setColor("#808080");
			setParentId(undefined);
		}
	}, [isOpen, initialParentId]);

	const handleSubmit = () => {
		onCreate({ name, color, parentId: parentId === "none" ? undefined : parentId });
		onClose();
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create New Tag</DialogTitle>
					<DialogDescription>Create a new tag to organize your files.</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Name
						</Label>
						<Input id="name" value={name} onChange={e => setName(e.target.value)} className="col-span-3" />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="color" className="text-right">
							Color
						</Label>
						<Input
							id="color"
							type="color"
							value={color}
							onChange={e => setColor(e.target.value)}
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="parent" className="text-right">
							Parent Tag
						</Label>
						<select
							id="parent"
							value={parentId || "none"}
							onChange={e => setParentId(e.target.value)}
							className="col-span-3"
						>
							<option value="none">None</option>
							{renderTagOptions(tags)}
						</select>
					</div>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button onClick={handleSubmit}>Create</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
