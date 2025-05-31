"use client";

import { FileBrowser } from "components/file-browser";
import { Header } from "components/header";
import { UploadButton } from "components/upload-button";
import { Suspense } from "react";

export default function DrivePage() {
	return (
		<>
			<Header />
			<div className="flex-1 flex flex-col p-2">
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-2xl font-semibold">My Files</h1>
					<UploadButton />
				</div>
				<div className="flex-1">
					<Suspense fallback={null}>
						<FileBrowser />
					</Suspense>
				</div>
			</div>
		</>
	);
}
