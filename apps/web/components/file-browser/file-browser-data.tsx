import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { FileItem } from "@/web/lib/types";
import { FileText, Folder, MoreVertical } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function FileBrowserData({ viewMode, data }: { viewMode: "grid" | "list"; data: FileItem[] }) {
	return data.length > 0 ? (
		<>
			{viewMode === "grid" && <FilesGrid data={data} />}
			{viewMode === "list" && <FilesList data={data} />}
		</>
	) : (
		<ZeroCase />
	);
}

function ZeroCase() {
	return <div className="col-span-full text-center py-8 text-muted-foreground text-sm">Nothing here :(</div>;
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
		</div>
	);
}

function FilesList({ data }: { data: FileItem[] }) {
	const searchParams = useSearchParams();

	return (
		<div className="overflow-hidden">
			<Table>
				<TableHeader>
					<TableRow className="!bg-transparent h-auto pb-2 text-xs text-muted-foreground">
						<TableHead className="h-auto pb-2 text-xs text-muted-foreground">Name</TableHead>
						<TableHead className="h-auto pb-2 text-xs text-muted-foreground">Modified</TableHead>
						<TableHead className="h-auto pb-2 text-xs text-muted-foreground">Size</TableHead>
						<TableHead className="h-0 w-0" />
					</TableRow>
				</TableHeader>

				<TableBody>
					{data.map(file => {
						const params = new URLSearchParams(searchParams.toString());
						params.append("id", file.id);

						return (
							<TableRow key={file.id} className="text-xs relative">
								<TableCell className="py-1">
									<span className="flex items-center gap-2 font-medium">
										<Link href={"?" + params.toString()} className="absolute inset-0" />

										{file.type === "folder" ? (
											<Folder className="h-4 w-4 text-foreground" />
										) : (
											<FileText className="h-4 w-4 text-foreground" />
										)}

										{file.name}
									</span>
								</TableCell>

								<TableCell className="py-1 text-muted-foreground">{file.modified}</TableCell>

								<TableCell className="py-1 text-muted-foreground">{file.size || "—"}</TableCell>

								<TableCell className="py-1">
									<FileActions />
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
}

function FileActions() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" className="size-8 bg-transparent relative">
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
