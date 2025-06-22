import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { Tag } from "@/lib/types";

function getDescendantIds(tag: Tag): string[] {
	if (!tag.children) return [];
	return tag.children.flatMap(child => [child.id, ...getDescendantIds(child)]);
}

function renderTagOptions(tags: Tag[], forbiddenIds: string[], level = 0): ReactNode[] {
	return tags.flatMap(t => {
		if (forbiddenIds.includes(t.id)) {
			return [];
		}
		return [
			<option key={t.id} value={t.id}>
				{"\u00A0".repeat(level * 2)}
				{t.name}
			</option>,
			...(t.children ? renderTagOptions(t.children, forbiddenIds, level + 1) : []),
		];
	});
}

interface UpdateTagDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onUpdate: (data: { id: string; name?: string; color?: string; parentId?: string }) => void;
	tags: Tag[];
	tag: Tag | null;
}

export function UpdateTagDialog({ isOpen, onClose, onUpdate, tags, tag }: UpdateTagDialogProps) {
	const [name, setName] = useState("");
	const [color, setColor] = useState("#808080");
	const [parentId, setParentId] = useState<string | undefined>(undefined);

	useEffect(() => {
		if (tag) {
			setName(tag.name);
			setColor(tag.color);
			setParentId(tag.parentId);
		}
	}, [tag]);

	const forbiddenIds = tag ? [tag.id, ...getDescendantIds(tag)] : [];

	const handleSubmit = () => {
		if (!tag) return;
		onUpdate({ id: tag.id, name, color, parentId: parentId === "none" ? undefined : parentId });
		onClose();
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Update Tag</DialogTitle>
					<DialogDescription>Update the details of your tag here.</DialogDescription>
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
							{renderTagOptions(tags, forbiddenIds)}
						</select>
					</div>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button onClick={handleSubmit}>Update</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
