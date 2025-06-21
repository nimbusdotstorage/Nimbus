"use client";

import { FileBrowserData } from "@/components/file-browser/file-browser-data";
import { ErrorMessageWithRetry } from "@/components/error-message/with-retry";
import { FileTabs } from "@/components/file-browser/file-tabs";
import { createRequest } from "@/hooks/createRequest";
import { useSearchParams } from "next/navigation";
import { useRequest } from "@/hooks/useRequest";
import { Loader } from "@/components/loader";
import type { FileItem } from "@/lib/types";
import React, { useState } from "react";

export function FileBrowser() {
	const searchParams = useSearchParams();
	const type = searchParams.get("type");
	const [localData, setLocalData] = useState<FileItem[] | null>(null);

	const fetchFiles = createRequest({
		path: "/files",
		queryParams: { type },
	});

	const { data, refetch, isLoading, error } = useRequest<FileItem[]>({
		request: fetchFiles,
		triggers: [type],
	});

	// Use local data if available, otherwise use fetched data
	const displayData = localData || data;

	const handleFileDeleted = (fileId: string) => {
		// Remove file from local state for immediate UI update
		if (displayData) {
			setLocalData(displayData.filter(file => file.id !== fileId));
		}
		// Refetch to sync with server

		refetch().catch(error => {
			console.error("Failed to sync with server:", error);
			// Optionally revert the optimistic update
			setLocalData(null);
		});
	};

	const handleFileRenamed = (fileId: string, newName: string) => {
		// Update file name in local state for immediate UI update
		if (displayData) {
			setLocalData(displayData.map(file => (file.id === fileId ? { ...file, name: newName } : file)));
		}
		// Refetch to sync with server
		refetch().catch(error => {
			console.error("Failed to sync with server:", error);
			// Optionally revert the optimistic update
			setLocalData(null);
		});
	};

	// Reset local data when fetched data changes
	React.useEffect(() => {
		if (data) {
			setLocalData(null);
		}
	}, [data]);

	return (
		<div className="flex flex-1 flex-col space-y-4">
			<div className="flex items-center justify-between">
				<FileTabs type={type} />
			</div>

			{isLoading ? (
				<Loader />
			) : error ? (
				<ErrorMessageWithRetry error={error} retryFn={refetch} />
			) : (
				displayData && (
					<FileBrowserData data={displayData} onFileDeleted={handleFileDeleted} onFileRenamed={handleFileRenamed} />
				)
			)}
		</div>
	);
}
