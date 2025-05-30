"use client";

import { Button } from "@/components/ui/button";
import { createRequest } from "@/web/hooks/createRequest";
import { Grid, List } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useRequest } from "../../hooks/useRequest";
import type { FileItem } from "../../lib/types";
import { ErrorMessageWithRetry } from "../error-message/with-retry";
import { Loader } from "../loader";
import { FileBrowserData } from "./file-browser-data";
import { FilePreview } from "./file-preview";
import { FileTabs } from "./file-tabs";

export function FileBrowser() {
	const searchParams = useSearchParams();
	const type = searchParams.get("type");
	const id = searchParams.get("id");

	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

	const fetchFiles = createRequest({
		url: "/api/files",
		queryParams: { type },
	});

	const { data, refetch, isLoading, error } = useRequest<FileItem[]>({
		request: fetchFiles,
		triggers: [type],
	});

	return (
		<div className={`space-y-4 flex-1 flex flex-col ${id ? "blur-sm transition-all" : ""}`}>
			<div className="flex items-center justify-between">
				<FileTabs type={type} />

				<div className="flex items-center gap-2">
					<Button variant={viewMode === "grid" ? "default" : "outline"} size="icon" onClick={() => setViewMode("grid")}>
						<Grid className="h-4 w-4" />
					</Button>
					<Button variant={viewMode === "list" ? "default" : "outline"} size="icon" onClick={() => setViewMode("list")}>
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
