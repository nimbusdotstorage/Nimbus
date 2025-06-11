import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { FileText, Folder, MoreVertical } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { FileItem } from "@/web/lib/types";
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
					<Link href={"?" + params.toString()} key={file.id}>
						<Card className="bg-card hover:bg-accent/10 cursor-pointer overflow-hidden transition-colors">
							<CardContent className="p-0">
								<div className="bg-muted/50 flex aspect-square items-center justify-center p-4">
									{file.type === "folder" ? (
										<Folder className="text-primary h-12 w-12" />
									) : (
										<FileText className="text-primary h-12 w-12" />
									)}
								</div>
							</CardContent>
							<CardFooter className="flex items-center justify-between p-2">
								<div className="truncate">
									<h3 className="truncate text-xs font-medium">{file.name}</h3>
									<p className="text-muted-foreground text-[10px]">{file.modified}</p>
								</div>
								<FileActions />
							</CardFooter>
						</Card>
					</Link>
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
										<FileText className="text-primary h-4 w-4" />
									)}
									{file.name}
								</td>
								<td className="text-muted-foreground p-3 text-sm">{file.modified}</td>
								<td className="text-muted-foreground p-3 text-sm">{file.size || "—"}</td>
								<td className="p-3">
									<FileActions />
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

function FileActions() {
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
				<DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
