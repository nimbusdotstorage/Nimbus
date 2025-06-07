import type React from "react";
import { useState, useRef } from "react";
import { Upload, Folder } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

interface UploadZoneProps {
	onFilesSelected: (files: FileList) => void;
	isFolder?: boolean;
	isUploading?: boolean;
	uploadProgress?: number;
}

export function UploadZone({
	onFilesSelected,
	isFolder = false,
	isUploading = false,
	uploadProgress = 0,
}: UploadZoneProps) {
	const [isDragging, setIsDragging] = useState(false);
	const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
		const files = e.dataTransfer.files;
		if (files.length > 0) {
			setSelectedFiles(files);
			onFilesSelected(files);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files) {
			setSelectedFiles(files);
			onFilesSelected(files);
		}
	};

	const handleZoneClick = () => {
		inputRef.current?.click();
	};

	return (
		<div className="grid gap-4 py-4">
			<input
				ref={inputRef}
				type="file"
				className="hidden"
				multiple={!isFolder}
				{...(isFolder ? { webkitdirectory: "" } : {})}
				onChange={handleInputChange}
			/>

			{!isUploading && (
				<div
					className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
						isDragging ? "border-primary bg-primary/5" : "border-gray-300 hover:border-gray-400 hover:bg-gray-950"
					}`}
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
					onClick={handleZoneClick}
				>
					{isFolder ? (
						<Folder className="mx-auto h-12 w-12 text-gray-400 mb-4" />
					) : (
						<Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
					)}
					<p className="text-sm text-gray-600 mb-2">
						{isDragging
							? `Drop ${isFolder ? "folder" : "files"} here`
							: `Click here or drag and drop ${isFolder ? "a folder" : "files"}`}
					</p>
					<p className="text-xs text-gray-500">
						{isFolder ? "Upload an entire folder at once" : "Supports multiple files"}
					</p>
				</div>
			)}

			{isUploading && (
				<div className="space-y-4">
					<Label>Uploading...</Label>
					<Progress value={uploadProgress} className="w-full" />
					<p className="text-sm text-center">{uploadProgress}% complete</p>
				</div>
			)}

			{selectedFiles && selectedFiles.length > 0 && !isUploading && (
				<div className="space-y-2">
					<Label>Selected {isFolder ? "folder contents" : "files"}:</Label>
					<div className="max-h-32 overflow-y-auto space-y-1">
						{Array.from(selectedFiles)
							.slice(0, 10)
							.map((file, index) => (
								<div key={index} className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded">
									<Upload className="h-4 w-4 text-black" />
									<span className="flex-1 truncate text-black">
										{isFolder ? file.webkitRelativePath || file.name : file.name}
									</span>
									<span className="text-black text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
								</div>
							))}
						{selectedFiles.length > 10 && (
							<p className="text-xs text-black text-center">... and {selectedFiles.length - 10} more files</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
