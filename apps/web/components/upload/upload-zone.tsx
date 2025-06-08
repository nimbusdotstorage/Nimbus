import { useDropzone } from "react-dropzone";
import { useState, useRef, useCallback, type ChangeEvent } from "react";
import { Upload, Folder } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

interface UploadZoneProps {
	onFilesSelected: (files: FileList | File[]) => void;
	isFolder?: boolean;
	isUploading?: boolean;
	uploadProgress?: number;
}

interface FileWithPath {
	webkitRelativePath?: string;
	name: string;
	size: number;
}

export function UploadZone({
	onFilesSelected,
	isFolder = false,
	isUploading = false,
	uploadProgress = 0,
}: UploadZoneProps) {
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			setSelectedFiles(acceptedFiles);
			onFilesSelected(acceptedFiles);
		},
		[onFilesSelected]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		noClick: true,
		noKeyboard: true,
		multiple: !isFolder,
	});

	const truncateFilename = (filename: string, maxLength: number = 40) => {
		if (filename.length <= maxLength) return filename;

		const extension = filename.split(".").pop();
		const nameWithoutExt = filename.slice(0, filename.lastIndexOf("."));

		const start = nameWithoutExt.slice(0, Math.floor(maxLength / 2));
		const end = nameWithoutExt.slice(-Math.floor(maxLength / 4));

		return `${start}...${end}.${extension}`;
	};

	const handleManualSelect = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const files = Array.from(e.target.files);
			setSelectedFiles(files);
			onFilesSelected(files);
		}
	};

	return (
		<div className="grid gap-4 py-4">
			{/* Hidden input for manual selection */}
			<input
				ref={fileInputRef}
				type="file"
				className="hidden"
				multiple={!isFolder}
				{...(isFolder ? { webkitdirectory: "true" } : {})}
				onChange={handleManualSelect}
			/>

			{/* Upload zone */}
			{!isUploading && (
				<div
					{...getRootProps()}
					className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
						isDragActive
							? "border-primary bg-primary/5"
							: "border-neutral-300 hover:border-neutral-400 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:border-neutral-600 dark:hover:bg-neutral-900"
					}`}
					onClick={() => fileInputRef.current?.click()}
				>
					<input {...getInputProps()} />

					{isFolder ? (
						<Folder className="mx-auto h-12 w-12 text-neutral-400 mb-4" />
					) : (
						<Upload className="mx-auto h-12 w-12 text-neutral-400 mb-4" />
					)}

					<p className="text-sm text-neutral-600 dark:text-neutral-200 mb-2">
						{isDragActive
							? `Drop ${isFolder ? "folder" : "files"} here`
							: `Click here or drag and drop ${isFolder ? "a folder" : "files"}`}
					</p>
					<p className="text-xs text-neutral-500 dark:text-neutral-200">
						{isFolder ? "Upload an entire folder at once" : "Supports multiple files"}
					</p>
				</div>
			)}

			{/* Uploading state */}
			{isUploading && (
				<div className="space-y-4">
					<Label>Uploading...</Label>
					<Progress value={uploadProgress} className="w-full" />
					<p className="text-sm text-center">{uploadProgress}% complete</p>
				</div>
			)}

			{/* File preview */}
			{selectedFiles.length > 0 && !isUploading && (
				<div className="space-y-2">
					<Label>Selected {isFolder ? "folder contents" : "files"}:</Label>
					<div className="max-h-32 overflow-y-auto space-y-1">
						{selectedFiles.slice(0, 10).map((file, index) => {
							const fileWithPath = file as FileWithPath;
							return (
								<div
									key={index}
									className="flex items-center gap-2 text-sm bg-neutral-50 dark:bg-neutral-800 p-2 rounded"
								>
									<Upload className="h-4 w-4 shrink-0 text-black dark:text-neutral-200" />
									<span
										className="flex-1 text-black min-w-0 font-mono dark:text-neutral-200"
										title={fileWithPath.webkitRelativePath || file.name}
									>
										{truncateFilename(fileWithPath.webkitRelativePath || file.name)}
									</span>
									<span className="text-black text-xs shrink-0 ml-2 dark:text-neutral-200">
										{(file.size / 1024 / 1024).toFixed(2)} MB
									</span>
								</div>
							);
						})}
						{selectedFiles.length > 10 && (
							<p className="text-xs text-black text-center dark:text-neutral-200">
								... and {selectedFiles.length - 10} more files
							</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
