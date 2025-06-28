import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreateTagDialog } from "@/components/dialogs/create-tag-dialog";
import { FileText, Folder, MoreVertical, Plus, X } from "lucide-react";
import { useFileOperations } from "@/hooks/useFileOperations";
import { useSearchParams } from "next/navigation";
import type { FileItem, Tag } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTags } from "@/hooks/useTags";
import { fileSize } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";

// TODO: Typing of the file data needs to be updated
export function FileBrowserData({ data, refetch }: { data: FileItem[]; refetch: () => void }) {
	return <FilesList data={data} refetch={refetch} />;
}

function FilesList({ data, refetch }: { data: FileItem[]; refetch: () => void }) {
	const searchParams = useSearchParams();
	const { tags } = useTags();

	return (
		<div className="overflow-hidden rounded-md border">
			<table className="w-full table-fixed">
				<thead className="text-muted-foreground bg-muted/50 text-left text-xs font-medium">
					<tr>
						<th className="p-3">Name</th>
						<th className="p-3">Modified</th>
						<th className="p-3">Size</th>
						<th className="p-3">Actions</th>
						<th className="p-3">Tags</th>
					</tr>
				</thead>
				<tbody>
					{data.map(file => {
						const size = file.size ? fileSize(file.size) : "—";
						const params = new URLSearchParams(searchParams.toString());
						params.set("id", file.id);

						return (
							<tr key={file.id} className="hover:bg-accent/10 relative cursor-pointer border-t transition-colors">
								<td className="flex items-center gap-2 truncate p-4">
									<Link href={"?" + params.toString()} className="absolute inset-0" />
									{file.type === "folder" ? (
										<Folder className="text-primary h-4 w-4" />
									) : (
										<FileText className="text-primary h-4 w-4" />
									)}
									{file.name}
								</td>
								<td className="text-muted-foreground p-3 text-sm">{file.modified}</td>
								<td className="text-muted-foreground p-3 text-sm">{size}</td>
								<td className="relative p-3">
									<FileActions id={file.id} />
								</td>
								<td className="relative p-3">
									<FileTags file={file} availableTags={tags} refetch={refetch} />
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

function FileTags({ file, availableTags, refetch }: { file: FileItem; availableTags: Tag[]; refetch: () => void }) {
	const { addTagsToFile, removeTagsFromFile, createTag } = useTags();
	const [isCreateTagOpen, setIsCreateTagOpen] = useState(false);

	const handleAddTag = (tagId: string) => {
		addTagsToFile({ fileId: file.id, tagIds: [tagId], onSuccess: refetch });
	};

	const handleRemoveTag = (tagId: string) => {
		removeTagsFromFile({ fileId: file.id, tagIds: [tagId], onSuccess: refetch });
	};

	const handleCreateTag = async (data: { name: string; color: string; parentId?: string }) => {
		// Create the tag
		createTag(data, {
			onSuccess: newTag => {
				setIsCreateTagOpen(false);
				// Add the new tag to the file
				handleAddTag(newTag.id);
				refetch();
			},
			onError: error => {
				console.error("Failed to create tag:", error);
			},
		});
	};

	const fileTagIds = file.tags?.map(t => t.id) ?? [];

	// Helper function to flatten hierarchical tag structure
	const flattenTags = (tags: Tag[]): Tag[] => {
		const flattened: Tag[] = [];
		const flattenRecursive = (tagList: Tag[]) => {
			tagList.forEach(tag => {
				flattened.push(tag);
				if (tag.children && tag.children.length > 0) {
					flattenRecursive(tag.children);
				}
			});
		};
		flattenRecursive(tags);
		return flattened;
	};

	// Get up to date tag information (in case tag is updated or deleted)
	const getUpdatedFileTags = () => {
		if (!file.tags) return [];

		// Create a flat lookup map of all available tags for O(1) access
		const tagMap = new Map<string, Tag>();
		const buildTagMap = (tags: Tag[]) => {
			tags.forEach(tag => {
				tagMap.set(tag.id, tag);
				if (tag.children) {
					buildTagMap(tag.children);
				}
			});
		};
		buildTagMap(availableTags);
		return file.tags
			.map(fileTag => tagMap.get(fileTag.id) || fileTag) // Use updated tag if available, fallback to original
			.filter(tag => tagMap.has(tag.id)); // Only keep tags that still exist
	};

	const updatedFileTags = getUpdatedFileTags();
	const flattenedAvailableTags = flattenTags(availableTags).filter(tag => !fileTagIds.includes(tag.id));

	return (
		<div className="flex max-w-full items-center gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
			{" "}
			{updatedFileTags.map(tag => (
				<div key={tag.id} className="group relative cursor-pointer">
					<Badge
						className="text-muted-foreground hover:bg-muted/80 group relative gap-1 overflow-hidden rounded-md border-0 px-2 py-1 text-xs font-medium transition-all duration-200 group-hover:pr-6"
						style={{ backgroundColor: tag.color + "20" }}
					>
						<div className="flex items-center gap-1.5">
							<div className="h-2 w-2 rounded-full" style={{ backgroundColor: tag.color }} />
							<span className="truncate">{tag.name}</span>
						</div>
						<div className="absolute top-1/2 right-1.5 h-3 w-3 -translate-y-1/2 transform">
							<X
								className={`h-3 w-3 rounded-xs opacity-0 transition-opacity duration-200 group-hover:opacity-70 hover:bg-neutral-100 hover:opacity-100 dark:hover:bg-neutral-700`}
								onClick={() => handleRemoveTag(tag.id)}
							/>
						</div>
					</Badge>
				</div>
			))}
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="sm"
						className="h-6 w-6 rounded-full p-0 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
					>
						<Plus className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="start">
					{flattenedAvailableTags.length > 0 ? (
						flattenedAvailableTags.map(tag => (
							<DropdownMenuItem key={tag.id} onClick={() => handleAddTag(tag.id)} className="cursor-pointer">
								<div className="flex items-center gap-2">
									<div className="h-3 w-3 rounded-full" style={{ backgroundColor: tag.color }} />
									{tag.name}
								</div>
							</DropdownMenuItem>
						))
					) : (
						<DropdownMenuItem onClick={() => setIsCreateTagOpen(true)} className="cursor-pointer">
							Create new tag
						</DropdownMenuItem>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
			<CreateTagDialog
				isOpen={isCreateTagOpen}
				onClose={() => setIsCreateTagOpen(false)}
				onCreate={handleCreateTag}
				tags={availableTags}
			/>
		</div>
	);
}

function FileActions({ id }: { id: string }) {
	const { handleDeleteFile } = useFileOperations();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" className="relative h-8 w-8">
					<MoreVertical className="h-4 w-4" />
					<span className="sr-only">Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem>Open</DropdownMenuItem>
				<DropdownMenuItem>Share</DropdownMenuItem>
				<DropdownMenuItem>Download</DropdownMenuItem>
				<DropdownMenuItem>Rename</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="text-destructive"
					onClick={e => {
						e.preventDefault();
						handleDeleteFile(id);
					}}
				>
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
