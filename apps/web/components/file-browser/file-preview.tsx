import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { createRequest } from "@/web/hooks/createRequest";
import { FileText, Folder, X, Image, Video } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRequest } from "@/web/hooks/useRequest";
import type { FileItem } from "@/web/lib/types";
import { parseError } from "@/web/utils/error";
import { Loader } from "@/components/loader";

interface FolderContentItem extends FileItem {
	path?: string;
}

export function FilePreview() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const id = searchParams.get("id");

	const fetchFile = createRequest({
		path: "/files/:id",
		pathParams: { id },
	});

	const { data, refetch, isLoading, error } = useRequest<FileItem>({
		request: fetchFile,
		triggers: [id],
		manual: true,
	});

	const fetchFolderContents = createRequest({
		path: "/files/:id/contents",
		pathParams: { id },
	});

	const {
		data: folderContents,
		isLoading: folderContentsLoading,
		refetch: refetchFolderContents,
	} = useRequest<FolderContentItem[]>({
		request: fetchFolderContents,
		triggers: [id],
		manual: true,
	});

	useEffect(() => {
		if (id && id !== data?.id) {
			void refetch();
		}
	}, [id, data?.id]);

	useEffect(() => {
		if (data?.type === "folder") {
			void refetchFolderContents();
		}
	}, [data?.type]);

	const handleClose = () => {
		const params = new URLSearchParams(searchParams.toString());
		params.delete("id");
		router.replace(`?${params.toString()}`);
	};

	const getFileIcon = (type: string) => {
		switch (type) {
			case "folder":
				return <Folder className="h-4 w-4 text-muted-foreground" />;
			case "image":
				return <Image className="h-4 w-4 text-muted-foreground" />;
			case "video":
				return <Video className="h-4 w-4 text-muted-foreground" />;
			default:
				return <FileText className="h-4 w-4 text-muted-foreground" />;
		}
	};

	return (
		<Sheet open={!!id} onOpenChange={handleClose}>
			<SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto" closeButton={false}>
				<SheetHeader className="mb-4">
					<div className="flex items-center justify-between">
						<SheetTitle>{!isLoading && data ? data.name : "Loading..."}</SheetTitle>
						<SheetClose asChild>
							<Button variant="ghost" size="icon">
								<X className="h-4 w-4" />
							</Button>
						</SheetClose>
					</div>
					<SheetDescription>
						{!isLoading && data
							? data.type === "document"
								? "Document Preview"
								: "Folder Contents"
							: "Loading file information..."}
					</SheetDescription>
				</SheetHeader>

				<div className="space-y-4">
					{isLoading ? (
						<Loader />
					) : error ? (
						<div className="space-y-2 flex-1 flex flex-col items-center justify-center">
							<p>{parseError(error)}</p>
							<Button onClick={refetch}>Try again</Button>
						</div>
					) : data?.type === "document" ? (
						<div className="border rounded-md p-4 bg-muted/30">
							<div className="aspect-[3/4] bg-background rounded-md border flex items-center justify-center mb-4">
								<FileText className="h-16 w-16 text-muted-foreground" />
							</div>
							<div className="space-y-2">
								<h3 className="font-medium">{data?.name}</h3>
								<p className="text-sm text-muted-foreground">Size: {data?.size}</p>
								<p className="text-sm text-muted-foreground">Last modified: {data?.modified}</p>
							</div>
							<div className="mt-6 pt-6 border-t">
								<h4 className="font-medium mb-2">Document Content Preview</h4>
								<div className="space-y-2">
									<div className="h-4 bg-muted rounded w-full"></div>
									<div className="h-4 bg-muted rounded w-5/6"></div>
									<div className="h-4 bg-muted rounded w-4/6"></div>
									<div className="h-4 bg-muted rounded w-full"></div>
									<div className="h-4 bg-muted rounded w-3/4"></div>
								</div>
							</div>
						</div>
					) : data?.type === "folder" ? (
						<div className="border rounded-md p-4 bg-muted/30">
							<div className="aspect-[4/3] bg-background rounded-md border flex items-center justify-center mb-4">
								<Folder className="h-16 w-16 text-muted-foreground" />
							</div>
							<div className="space-y-2">
								<h3 className="font-medium">{data?.name}</h3>
								<p className="text-sm text-muted-foreground">Last modified: {data?.modified}</p>
								{data?.size && <p className="text-sm text-muted-foreground">Total size: {data?.size}</p>}
							</div>
							<div className="mt-6 pt-6 border-t">
								<h4 className="font-medium mb-2">Folder Contents</h4>
								{folderContentsLoading ? (
									<div className="flex justify-center p-4">
										<Loader />
									</div>
								) : folderContents && folderContents.length > 0 ? (
									<div className="space-y-1 max-h-60 overflow-y-auto pr-2">
										{folderContents.map(item => (
											<div key={item.id} className="flex items-center space-x-2 p-2 rounded hover:bg-muted">
												{getFileIcon(item.type)}
												<span className="text-sm truncate">{item.name}</span>
											</div>
										))}
									</div>
								) : (
									<p className="text-sm text-muted-foreground p-2">This folder is empty</p>
								)}
							</div>
						</div>
					) : (
						<div className="text-center py-8 text-muted-foreground">
							<Folder className="h-12 w-12 mx-auto mb-2" />
							<p>Preview not available</p>
						</div>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
}
