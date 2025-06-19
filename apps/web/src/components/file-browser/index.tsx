"use client";

import { FileBrowserData } from "@/components/file-browser/file-browser-data";
import { FilePreview } from "@/components/file-browser/file-preview";
import { FileTabs } from "@/components/file-browser/file-tabs";

export function FileBrowser() {
	return (
		<div className={`flex flex-1 flex-col space-y-4`}>
			<div className="flex items-center justify-between">
				<FileTabs type={"all"} />
			</div>

			<FileBrowserData />

			<FilePreview />
		</div>
	);
}
