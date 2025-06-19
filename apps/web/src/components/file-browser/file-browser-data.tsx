import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileText, Folder, MoreVertical, Loader2, RefreshCw, AlertCircle } from "lucide-react";
import { useListFiles, useDeleteFile } from "@/hooks/useFileOperations";
import { type GoogleDriveFile } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

export function FileBrowserData() {
	const [pageToken, setPageToken] = useState<string | undefined>(undefined);
	const searchParams = useSearchParams();
	// TODO: use reactQuery native pagination instead of useState
	const [pageHistory, setPageHistory] = useState<string[]>([]);
	const { isPending, isError, data, error, refetch } = useListFiles(undefined, pageToken);

	// Show loading state
	if (isPending) {
		return (
			<div className="flex flex-col items-center justify-center gap-3 py-12">
				<Loader2 className="text-primary h-8 w-8 animate-spin" />
				<p className="text-muted-foreground">Loading files...</p>
			</div>
		);
	}

	// Show error state
	if (isError) {
		return (
			<div className="flex flex-col items-center justify-center gap-4 py-12">
				<AlertCircle className="text-destructive h-8 w-8" />
				<div className="text-center">
					<p className="text-destructive font-medium">Failed to load files</p>
					<p className="text-muted-foreground mt-1 text-sm">
						{error instanceof Error ? error.message : "An unexpected error occurred"}
					</p>
				</div>
				<Button onClick={() => refetch()} variant="outline" className="gap-2">
					<RefreshCw className="h-4 w-4" />
					Try Again
				</Button>
			</div>
		);
	}

	// Show empty state
	if (!data) {
		return (
			<div className="flex flex-col items-center justify-center gap-3 py-12">
				<FileText className="text-muted-foreground h-8 w-8" />
				<p className="text-muted-foreground">No files found</p>
				<Button variant="outline" className="gap-2">
					<RefreshCw className="h-4 w-4" />
					Try Again
				</Button>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{/* File table */}
			<div className="overflow-hidden rounded-md border">
				<table className="w-full">
					<thead className="text-muted-foreground bg-muted/50 text-left text-xs font-medium">
						<tr>
							<th className="p-3">Name</th>
							<th className="p-3">Modified</th>
							<th className="p-3">Size</th>
							<th className="p-3">Actions</th>
						</tr>
					</thead>
					<tbody>
						{data.files.map((file: GoogleDriveFile) => {
							const params = new URLSearchParams(searchParams?.toString() || "");
							if (file.id) params.set("id", file.id);

							return (
								<tr key={file.id} className="hover:bg-accent/10 relative cursor-pointer border-t transition-colors">
									<td className="flex w-lg items-center gap-2 p-4">
										<Link href={"?" + params.toString()} className="absolute inset-0" />
										{file.mimeType === "application/vnd.google-apps.folder" ? (
											<Folder className="text-primary h-4 w-4" />
										) : (
											<FileText className="text-primary h-4 w-4" />
										)}
										{file.name || "Untitled"}
									</td>
									<td className="text-muted-foreground p-3 text-sm">{file.modifiedTime || "—"}</td>
									<td className="text-muted-foreground p-3 text-sm">
										{typeof file.size === "number" ? `${(file.size / 1024).toFixed(2)} KB` : "—"}
									</td>
									<td className="p-3">
										<FileActions id={file.id} name={file.name} />
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			{/* WIP pagination */}
			<div className="flex items-center justify-between">
				<Button
					onClick={() => {
						const newHistory = [...pageHistory];
						const previousToken = newHistory.pop();
						setPageHistory(newHistory);
						setPageToken(previousToken);
					}}
					disabled={pageHistory.length === 0}
				>
					Previous page
				</Button>
				<Button
					onClick={() => {
						if (data.nextPageToken) {
							if (pageToken) {
								setPageHistory([...pageHistory, pageToken]);
							}
							setPageToken(data.nextPageToken);
						}
					}}
					disabled={!data.nextPageToken}
				>
					Next page
				</Button>
			</div>
		</div>
	);
}

function FileActions({ id, name }: { id: string | undefined; name: string | undefined }) {
	const deleteFile = useDeleteFile();

	const handleDelete = async () => {
		if (!id) return;
		if (confirm(`Are you sure you want to delete "${name || "Untitled"}"?`)) {
			try {
				await deleteFile.mutateAsync({ id });
				toast.success(`"${name}" has been deleted`);
			} catch {
				// Error is already handled by the hook
			}
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" className="relative h-8 w-8" disabled={deleteFile.isPending}>
					{deleteFile.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreVertical className="h-4 w-4" />}
					<span className="sr-only">Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem>Open</DropdownMenuItem>
				<DropdownMenuItem>Share</DropdownMenuItem>
				<DropdownMenuItem>Download</DropdownMenuItem>
				<DropdownMenuItem>Rename</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="text-destructive" onClick={handleDelete} disabled={deleteFile.isPending}>
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
