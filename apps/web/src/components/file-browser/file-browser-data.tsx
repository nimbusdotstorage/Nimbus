import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFileOperations } from "@/hooks/useFileOperations";
import { FileText, Folder, MoreVertical, ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { FileItem, SortConfig, SortField } from "@/lib/types";
import { formatFileSizeDisplay } from "@/lib/utils";
import Link from "next/link";
import type React from "react";

interface FileBrowserDataProps {
	data: FileItem[];
	sortConfig?: SortConfig;
	onSortChange?: (field: SortField) => void;
}

export function FileBrowserData({ data, sortConfig, onSortChange }: FileBrowserDataProps) {
	return <FilesList data={data} sortConfig={sortConfig} onSortChange={onSortChange} />;
}

interface FilesListProps {
	data: FileItem[];
	sortConfig?: SortConfig;
	onSortChange?: (field: SortField) => void;
}

function FilesList({ data, sortConfig, onSortChange }: FilesListProps) {
	const searchParams = useSearchParams();

	const handleSort = (field: SortField) => {
		if (onSortChange) {
			onSortChange(field);
		}
	};

	const getSortIcon = (field: SortField) => {
		if (!sortConfig || sortConfig.field !== field) {
			return <ArrowUpDown className="h-3 w-3 opacity-50" />;
		}
		return sortConfig.direction === "asc" ? 
			<ArrowUp className="h-3 w-3" /> : 
			<ArrowDown className="h-3 w-3" />;
	};

	const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
		<th className="p-3">
			<button
				onClick={() => handleSort(field)}
				className="flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer"
				disabled={!onSortChange}
			>
				{children}
				{getSortIcon(field)}
			</button>
		</th>
	);

	return (
		<div className="overflow-hidden rounded-md border">
			<table className="w-full">
				<thead className="text-muted-foreground bg-muted/50 text-left text-xs font-medium">
					<tr>
						<SortableHeader field="name">Name</SortableHeader>
						<SortableHeader field="modified">Modified</SortableHeader>
						<SortableHeader field="size">Size</SortableHeader>
						<th className="p-3">Actions</th>
					</tr>
				</thead>
				<tbody>
					{data.map(file => {
						const params = new URLSearchParams(searchParams.toString());
						params.set("id", file.id);

						return (
							<tr key={file.id} className="hover:bg-accent/10 relative cursor-pointer border-t transition-colors">
								<td className="flex items-center gap-2 p-4">
									<Link href={"?" + params.toString()} className="absolute inset-0" />
									{file.type === "folder" ? (
										<Folder className="text-primary h-4 w-4" />
									) : (
										<FileText className="text-primary h-4 w-4" />
									)}
									{file.name}
								</td>
								<td className="text-muted-foreground p-3 text-sm">{new Date(file.modified).toLocaleDateString()}</td>
								<td className="text-muted-foreground p-3 text-sm">{formatFileSizeDisplay(file.size)}</td>
								<td className="p-3">
									<FileActions id={file.id} />
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
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
