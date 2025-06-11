import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoveRight, Pencil, Share2, Download, Trash2, MoreVertical, Folder, Eye } from "lucide-react";
import { useFileActions, type FileType } from "@/web/hooks/useFileActions";
import { getFileIcon } from "@/web/components/file-browser/file-icons";
import { RenameDialog } from "@/web/components/dialogs/rename-dialog";
import { DeleteDialog } from "@/web/components/dialogs/delete-dialog";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MoveDialog } from "@/web/components/dialogs/move-dialog";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { FileItem } from "@/web/lib/types";
import { toast } from "sonner";
import Link from "next/link";

export function FileBrowserData({ viewMode, data }: { viewMode: "grid" | "list"; data: FileItem[] }) {
	return viewMode === "grid" ? <FilesGrid data={data} /> : <FilesList data={data} />;
}

function FilesGrid({ data }: { data: FileItem[] }) {
	const searchParams = useSearchParams();

	return (
		<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
			{data.map(file => {
				const params = new URLSearchParams(searchParams.toString());
				params.append("id", file.id);

				return (
					<div key={file.id} className="relative">
						<Link href={"?" + params.toString()}>
							<Card className="bg-card hover:bg-accent/10 cursor-pointer overflow-hidden transition-colors">
								<CardContent className="p-0">
									<div className="bg-muted/50 flex aspect-square items-center justify-center p-4">
										{file.type === "folder" ? (
											<Folder className="text-primary h-12 w-12" />
										) : (
											getFileIcon(file.name, "text-primary h-12 w-12")
										)}
									</div>
								</CardContent>
								<CardFooter className="flex items-center justify-between p-2">
									<div className="truncate">
										<h3 className="truncate text-xs font-medium">{file.name}</h3>
										<p className="text-muted-foreground text-[10px]">{file.modified}</p>
									</div>
									<div className="relative z-10" onClick={e => e.preventDefault()}>
										<FileActions file={file} />
									</div>
								</CardFooter>
							</Card>
						</Link>
					</div>
				);
			})}
			{/* zero case */}
			{data.length === 0 && (
				<div className="text-muted-foreground col-span-full py-8 text-center text-sm">Nothing here :(</div>
			)}
		</div>
	);
}

function FilesList({ data }: { data: FileItem[] }) {
	const searchParams = useSearchParams();

	return (
		<div className="overflow-hidden rounded-md border">
			<table className="w-full">
				<thead>
					<tr className="bg-muted/50">
						<th className="p-3 text-left font-medium">Name</th>
						<th className="p-3 text-left font-medium">Modified</th>
						<th className="p-3 text-left font-medium">Size</th>
						<th className="w-10 p-3"></th>
					</tr>
				</thead>
				<tbody>
					{data.map(file => {
						const params = new URLSearchParams(searchParams.toString());
						params.append("id", file.id);

						return (
							<tr key={file.id} className="hover:bg-accent/10 relative cursor-pointer border-t transition-colors">
								<td className="flex items-center gap-2 p-4">
									<Link href={"?" + params.toString()} className="absolute inset-0" />
									{file.type === "folder" ? (
										<Folder className="text-primary h-4 w-4" />
									) : (
										getFileIcon(file.name, "text-primary h-4 w-4")
									)}
									{file.name}
								</td>
								<td className="text-muted-foreground p-3 text-sm">{file.modified}</td>
								<td className="text-muted-foreground p-3 text-sm">{file.size || "—"}</td>
								<td className="p-3">
									<div className="relative z-10" onClick={e => e.stopPropagation()}>
										<FileActions file={file} />
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>

			{data.length === 0 && <div className="text-muted-foreground py-8 text-center text-sm">No files found</div>}
		</div>
	);
}

function FileActions({ file }: { file: FileItem }) {
	const {
		handleRenameAction,
		handleDeleteAction,
		handleMoveAction,
		renameDialogOpen,
		deleteDialogOpen,
		moveDialogOpen,
		setRenameDialogOpen,
		setDeleteDialogOpen,
		setMoveDialogOpen,
		renameItem,
		deleteItem,
		moveItem,
		selectedItem,
	} = useFileActions();
	const router = useRouter();

	const fileType: FileType = file.type === "folder" ? "folder" : "file";

	const handleDownload = () => {
		toast.success(`${file.type === "folder" ? "Folder" : "File"} "${file.name}" download started`);
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon" className="relative h-8 w-8">
						<MoreVertical className="h-4 w-4" />
						<span className="sr-only">Open menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem
						onClick={() => {
							const params = new URLSearchParams(window.location.search);
							params.set("id", file.id);
							router.push(`?${params.toString()}`);
						}}
					>
						<Eye className="mr-2 h-4 w-4" />
						Open
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Share2 className="mr-2 h-4 w-4" />
						Share
					</DropdownMenuItem>
					{file.type !== "folder" && (
						<DropdownMenuItem onClick={handleDownload}>
							<Download className="mr-2 h-4 w-4" />
							Download
						</DropdownMenuItem>
					)}
					<DropdownMenuItem onClick={() => handleRenameAction(file.id, file.name, fileType)}>
						<Pencil className="mr-2 h-4 w-4" />
						Rename
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => handleMoveAction(file.id, file.name, fileType)}>
						<MoveRight className="mr-2 h-4 w-4" />
						Move
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						className="text-destructive focus:text-destructive"
						onClick={() => handleDeleteAction(file.id, file.name, fileType)}
					>
						<Trash2 className="mr-2 h-4 w-4" />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			{/* File Action Modals */}
			{selectedItem && (
				<>
					<RenameDialog
						open={renameDialogOpen}
						onOpenChange={setRenameDialogOpen}
						onRename={renameItem}
						itemName={selectedItem.name}
						itemType={selectedItem.type}
					/>

					<DeleteDialog
						open={deleteDialogOpen}
						onOpenChange={setDeleteDialogOpen}
						onDelete={deleteItem}
						itemName={selectedItem.name}
						itemType={selectedItem.type}
					/>

					<MoveDialog
						open={moveDialogOpen}
						onOpenChange={setMoveDialogOpen}
						onMove={moveItem}
						itemName={selectedItem.name}
						itemType={selectedItem.type}
					/>
				</>
			)}
		</>
	);
}
