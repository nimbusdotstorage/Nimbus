"use client";

import { FileBrowser } from "@/components/dashboard/file-browser";
import { UploadButton } from "@/components/upload-button";
import { Header } from "@/components/dashboard/header";
import { Suspense } from "react";

export default function DrivePage() {
	return (
		<>
			<Header />
			<div className="flex flex-1 flex-col p-2">
				<div className="mb-6 flex items-center justify-between">
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
