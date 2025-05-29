import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { FileText, Folder, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRequest } from "../../hooks/useRequest";
import type { FileItem } from "../../lib/types";
import { parseError } from "../../utils/error/parse";
import { Loader } from "../loader";

export function FilePreview() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const id = searchParams.get("id");

	const { data, fetchData, loading, error } = useRequest<FileItem>({
		request: (signal: AbortSignal) => fetch(`/api/files/${id}`, { signal }),
		triggers: [id],
		manual: true,
	});

	useEffect(() => {
		if (id && id !== data?.id) {
			void fetchData();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, data?.id]);

	const handleClose = () => {
		if (!id) return;
		const params = new URLSearchParams(searchParams.toString());
		params.delete("id");
		router.replace(`?${params.toString()}`);
	};

	return (
		<Sheet open={!!id} onOpenChange={handleClose}>
			<SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto" closeButton={false}>
				<SheetHeader className="mb-4">
					<div className="flex items-center justify-between">
						<SheetTitle>{!loading && data ? data.name : "PLACEHOLDER_HERE"}</SheetTitle>
						<SheetClose asChild>
							<Button variant="ghost" size="icon">
								<X className="h-4 w-4" />
							</Button>
						</SheetClose>
					</div>
					<SheetDescription>
						{!loading && data
							? data.type === "document"
								? "Document Preview"
								: "Folder Contents"
							: "PLACEHOLDER_HERE"}
					</SheetDescription>
				</SheetHeader>

				<div className="space-y-4">
					{loading ? (
						<Loader />
					) : error ? (
						<div className="space-y-2 flex-1 flex flex-col items-center justify-center">
							<p>{parseError(error)}</p>
							<Button onClick={fetchData}>Try again</Button>
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
					) : (
						<div className="text-center py-8 text-muted-foreground">
							<Folder className="h-12 w-12 mx-auto mb-2" />
							<p>Folder preview not available</p>
						</div>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
}
