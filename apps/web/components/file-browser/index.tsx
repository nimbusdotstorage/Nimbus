"use client";

import { FileBrowserData } from "@/components/file-browser/file-browser-data";
import { ErrorMessageWithRetry } from "@/components/error-message/with-retry";
import { FilePreview } from "@/components/file-browser/file-preview";
import { FileTabs } from "@/components/file-browser/file-tabs";
import { createRequest } from "@/web/hooks/createRequest";
import { useRequest } from "@/web/hooks/useRequest";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { FileItem } from "@/web/lib/types";
import { Loader } from "@/components/loader";
import { Grid, List } from "lucide-react";
import { useState } from "react";

export function FileBrowser() {
	const searchParams = useSearchParams();
	const type = searchParams.get("type");
	const id = searchParams.get("id");

	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

	const fetchFiles = createRequest({
		path: "/files",
		queryParams: { type },
	});

	const { data, refetch, isLoading, error } = useRequest<FileItem[]>({
		request: fetchFiles,
		triggers: [type],
	});

	return (
		<div className={`flex flex-1 flex-col space-y-4 ${id ? "blur-sm transition-all" : ""}`}>
			<div className="flex items-center justify-between">
				<FileTabs type={type} />

				<div className="flex items-center gap-2">
					<Button
						variant={viewMode === "grid" ? "default" : "outline"}
						size="icon"
						className="cursor-pointer"
						onClick={() => setViewMode("grid")}
					>
						<Grid className="h-4 w-4" />
					</Button>
					<Button
						variant={viewMode === "list" ? "default" : "outline"}
						size="icon"
						className="cursor-pointer"
						onClick={() => setViewMode("list")}
					>
						<List className="h-4 w-4" />
					</Button>
				</div>
			</div>

			{isLoading ? (
				<Loader />
			) : error ? (
				<ErrorMessageWithRetry error={error} retryFn={refetch} />
			) : (
				data && <FileBrowserData viewMode={viewMode} data={data} />
			)}

			<FilePreview />
		</div>
	);
}
