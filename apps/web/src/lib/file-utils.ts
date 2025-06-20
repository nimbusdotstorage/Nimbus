import type { FileItem } from "./types";

/**
 * Format file size in human readable format
 */
export function formatFileSize(bytes?: string | number): string {
	if (!bytes) return "—";

	const size = typeof bytes === "string" ? parseInt(bytes) : bytes;
	if (isNaN(size)) return "—";

	const units = ["B", "KB", "MB", "GB", "TB"];
	let unitIndex = 0;
	let sizeInUnit = size;

	while (sizeInUnit >= 1024 && unitIndex < units.length - 1) {
		sizeInUnit /= 1024;
		unitIndex++;
	}

	return `${sizeInUnit.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

/**
 * Get file extension from name
 */
export function getFileExtension(fileName: string): string {
	const lastDot = fileName.lastIndexOf(".");
	return lastDot > 0 ? fileName.substring(lastDot + 1).toLowerCase() : "";
}

/**
 * Get appropriate icon for file type
 */
export function getFileIcon(mimeType?: string): string {
	if (!mimeType) return "📄";

	if (mimeType.startsWith("image/")) return "🖼️";
	if (mimeType.startsWith("video/")) return "🎥";
	if (mimeType.startsWith("audio/")) return "🎵";
	if (mimeType === "application/pdf") return "📕";
	if (mimeType.startsWith("text/") || isCodeFile(mimeType)) return "📝";
	if (isOfficeDocument(mimeType)) return "📊";
	if (isArchiveFile(mimeType)) return "🗂️";
	if (mimeType === "application/vnd.google-apps.folder") return "📁";

	return "📄";
}

/**
 * Check if the file is a code file
 */
function isCodeFile(mimeType: string): boolean {
	const codeMimeTypes = [
		"application/javascript",
		"application/typescript",
		"text/javascript",
		"text/typescript",
		"text/css",
		"text/html",
		"application/x-python",
		"text/x-python",
		"application/java",
		"text/x-java-source",
		"text/x-c",
		"text/x-c++",
		"text/x-csharp",
		"application/x-php",
	];

	return codeMimeTypes.includes(mimeType);
}

/**
 * Check if the file is an office document
 */
function isOfficeDocument(mimeType: string): boolean {
	const officeMimeTypes = [
		// Google Workspace
		"application/vnd.google-apps.document",
		"application/vnd.google-apps.spreadsheet",
		"application/vnd.google-apps.presentation",
		"application/vnd.google-apps.drawing",

		// Microsoft Office
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
		"application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
		"application/msword", // .doc
		"application/vnd.ms-excel", // .xls
		"application/vnd.ms-powerpoint", // .ppt

		// LibreOffice/OpenOffice
		"application/vnd.oasis.opendocument.text", // .odt
		"application/vnd.oasis.opendocument.spreadsheet", // .ods
		"application/vnd.oasis.opendocument.presentation", // .odp
	];

	return officeMimeTypes.includes(mimeType);
}

/**
 * Check if the file is an archive
 */
function isArchiveFile(mimeType: string): boolean {
	const archiveMimeTypes = [
		"application/zip",
		"application/x-rar-compressed",
		"application/x-7z-compressed",
		"application/x-tar",
		"application/gzip",
		"application/x-bzip2",
	];

	return archiveMimeTypes.includes(mimeType);
}
