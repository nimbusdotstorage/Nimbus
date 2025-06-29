"use client";

import { FileBrowserData } from "@/components/dashboard/file-browser/file-browser-data";
import { FilePreview } from "@/components/dashboard/file-browser/file-preview";
import { ErrorMessageWithRetry } from "@/components/error-message/with-retry";
import { FileTabs } from "@/components/dashboard/file-browser/file-tabs";
import { createRequest } from "@/hooks/createRequest";
import { useSearchParams } from "next/navigation";
import { useRequest } from "@/hooks/useRequest";
import { Loader } from "@/components/loader";
import type { FileItem } from "@/lib/types";

export function FileBrowser() {
	const searchParams = useSearchParams();
	const type = searchParams.get("type");
	const id = searchParams.get("id");

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
			</div>

			{isLoading ? (
				<Loader />
			) : error ? (
				<ErrorMessageWithRetry error={error} retryFn={refetch} />
			) : (
				data && <FileBrowserData data={data} refetch={refetch} />
			)}

			<FilePreview />
		</div>
	);
}
