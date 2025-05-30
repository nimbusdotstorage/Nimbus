import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileText, Folder, MoreVertical } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { FileItem } from "@/web/lib/types";
import { Button } from "@/components/ui/button";

export function FileBrowserData({ viewMode, data }: { viewMode: "grid" | "list"; data: FileItem[] }) {
	return viewMode === "grid" ? <FilesGrid data={data} /> : <FilesList data={data} />;
}

function FilesGrid({ data }: { data: FileItem[] }) {
	const searchParams = useSearchParams();

	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
			{data.map(file => {
				const params = new URLSearchParams(searchParams.toString());
				params.append("id", file.id);

				return (
					<Link href={"?" + params.toString()} key={file.id}>
						<Card className="overflow-hidden bg-card hover:bg-accent/10 transition-colors cursor-pointer">
							<CardContent className="p-0">
								<div className="aspect-square flex items-center justify-center bg-muted/50 p-4">
									{file.type === "folder" ? (
										<Folder className="h-12 w-12 text-primary" />
									) : (
										<FileText className="h-12 w-12 text-primary" />
									)}
								</div>
							</CardContent>
							<CardFooter className="flex items-center justify-between p-2">
								<div className="truncate">
									<h3 className="text-xs font-medium truncate">{file.name}</h3>
									<p className="text-[10px] text-muted-foreground">{file.modified}</p>
								</div>
								<FileActions />
							</CardFooter>
						</Card>
					</Link>
				);
			})}
			{/* zero case */}
			{data.length === 0 && (
				<div className="col-span-full text-center py-8 text-muted-foreground text-sm">Nothing here :(</div>
			)}
		</div>
	);
}

function FilesList({ data }: { data: FileItem[] }) {
	const searchParams = useSearchParams();

	return (
		<div className="border rounded-md overflow-hidden">
			<table className="w-full">
				<thead>
					<tr className="bg-muted/50">
						<th className="text-left p-3 font-medium">Name</th>
						<th className="text-left p-3 font-medium">Modified</th>
						<th className="text-left p-3 font-medium">Size</th>
						<th className="p-3 w-10"></th>
					</tr>
				</thead>
				<tbody>
					{data.map(file => {
						const params = new URLSearchParams(searchParams.toString());
						params.append("id", file.id);

						return (
							<tr key={file.id} className="border-t hover:bg-accent/10 transition-colors cursor-pointer relative">
								<td className="p-4 flex items-center gap-2">
									<Link href={"?" + params.toString()} className="absolute inset-0" />
									{file.type === "folder" ? (
										<Folder className="h-4 w-4 text-primary" />
									) : (
										<FileText className="h-4 w-4 text-primary" />
									)}
									{file.name}
								</td>
								<td className="p-3 text-sm text-muted-foreground">{file.modified}</td>
								<td className="p-3 text-sm text-muted-foreground">{file.size || "—"}</td>
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
				<Button variant="ghost" size="icon" className="h-8 w-8 relative">
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
