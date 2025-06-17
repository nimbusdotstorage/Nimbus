"use client";

import { FileBrowserData } from "@/components/file-browser/file-browser-data";
import { ErrorMessageWithRetry } from "@/components/error-message/with-retry";
import { SortControls } from "@/components/file-browser/sort-controls";
import { FilePreview } from "@/components/file-browser/file-preview";
import { FileTabs } from "@/components/file-browser/file-tabs";
import { createRequest } from "@/hooks/createRequest";
import { useSearchParams } from "next/navigation";
import { useRequest } from "@/hooks/useRequest";
import { Loader } from "@/components/loader";
import type { FileItem, SortConfig, SortField } from "@/lib/types";
import { sortFiles, toggleSortDirection } from "@/lib/utils";
import { useState, useMemo } from "react";

export function FileBrowser() {
	const searchParams = useSearchParams();
	const type = searchParams.get("type");
	const id = searchParams.get("id");

	// Sorting state
	const [sortConfig, setSortConfig] = useState<SortConfig>({
		field: "name",
		direction: "asc",
	});

	const fetchFiles = createRequest({
		path: "/files",
		queryParams: { type },
	});

	const { data, refetch, isLoading, error } = useRequest<FileItem[]>({
		request: fetchFiles,
		triggers: [type],
	});

	// Handle sorting
	const handleSortChange = (field: SortField) => {
		setSortConfig(prev => ({
			field,
			direction: prev.field === field ? toggleSortDirection(prev.direction) : "asc",
		}));
	};



	// Memoized sorted data
	const sortedData = useMemo(() => {
		if (!data) return null;
		return sortFiles(data, sortConfig);
	}, [data, sortConfig]);

	return (
		<div className={`flex flex-1 flex-col space-y-4 ${id ? "blur-sm transition-all" : ""}`}>
			<div className="flex items-center justify-between">
				<FileTabs type={type} />
				{/* Only show sort controls when we have data */}
				{sortedData && sortedData.length > 0 && (
					<SortControls sortConfig={sortConfig} onSortChange={handleSortChange} />
				)}
			</div>

			{isLoading ? (
				<Loader />
			) : error ? (
				<ErrorMessageWithRetry error={error} retryFn={refetch} />
			) : (
				sortedData && (
					<FileBrowserData 
						data={sortedData} 
						sortConfig={sortConfig} 
						onSortChange={handleSortChange} 
					/>
				)
			)}

			<FilePreview />
		</div>
	);
}
