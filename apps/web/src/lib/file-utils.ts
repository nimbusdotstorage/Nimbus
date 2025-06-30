/**
 * Format file size to human-readable string
 * @param bytes File size in bytes
 * @returns Formatted size string (e.g., "1.5 MB")
 */
export function formatFileSize(bytes: number): string {
	if (bytes === 0) return "0 Bytes";

	const k = 1024;
	const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/**
 * Extract file extension from filename
 * @param filename Name of the file
 * @returns File extension without the dot (e.g., "pdf")
 */
export function getFileExtension(filename: string): string {
	const lastDotIndex = filename.lastIndexOf(".");
	if (lastDotIndex === -1 || lastDotIndex === filename.length - 1) {
		return "";
	}
	return filename.slice(lastDotIndex + 1).toLowerCase();
}

/**
 * Get file icon emoji based on MIME type
 * @param mimeType MIME type of the file
 * @param filename Optional filename for fallback detection
 * @returns Emoji icon representing the file type
 */
export function getFileIcon(mimeType?: string, filename?: string): string {
	if (!mimeType) {
		// Fallback to extension-based detection
		if (filename) {
			const ext = getFileExtension(filename);
			return getIconByExtension(ext);
		}
		return "📄"; // Default document icon
	}

	// Folder
	if (mimeType === "application/vnd.google-apps.folder") {
		return "📁";
	}

	// Images
	if (mimeType.startsWith("image/")) {
		return "🖼️";
	}

	// Videos
	if (mimeType.startsWith("video/")) {
		return "🎥";
	}

	// Audio
	if (mimeType.startsWith("audio/")) {
		return "🎵";
	}

	// Google Workspace files
	if (mimeType === "application/vnd.google-apps.document") {
		return "📝"; // Google Docs
	}
	if (mimeType === "application/vnd.google-apps.spreadsheet") {
		return "📊"; // Google Sheets
	}
	if (mimeType === "application/vnd.google-apps.presentation") {
		return "📈"; // Google Slides
	}

	// Archive files
	if (isArchiveFile(mimeType)) {
		return "📦";
	}

	// Code files
	if (isCodeFile(mimeType, filename)) {
		return "💻";
	}

	// Office documents
	if (isOfficeFile(mimeType)) {
		return "📄";
	}

	// PDF
	if (mimeType === "application/pdf") {
		return "📄";
	}

	// Text files
	if (mimeType.startsWith("text/")) {
		return "📝";
	}

	// Default
	return "📄";
}

/**
 * Get icon by file extension (fallback method)
 */
function getIconByExtension(extension: string): string {
	const iconMap: Record<string, string> = {
		// Images
		jpg: "🖼️",
		jpeg: "🖼️",
		png: "🖼️",
		gif: "🖼️",
		svg: "🖼️",
		webp: "🖼️",
		// Videos
		mp4: "🎥",
		avi: "🎥",
		mov: "🎥",
		mkv: "🎥",
		webm: "🎥",
		// Audio
		mp3: "🎵",
		wav: "🎵",
		flac: "🎵",
		aac: "🎵",
		// Documents
		pdf: "📄",
		doc: "📄",
		docx: "📄",
		txt: "📝",
		// Spreadsheets
		xls: "📊",
		xlsx: "📊",
		csv: "📊",
		// Presentations
		ppt: "📈",
		pptx: "📈",
		// Code
		js: "💻",
		ts: "💻",
		jsx: "💻",
		tsx: "💻",
		html: "💻",
		css: "💻",
		py: "💻",
		java: "💻",
		cpp: "💻",
		c: "💻",
		// Archives
		zip: "📦",
		rar: "📦",
		"7z": "📦",
		tar: "📦",
		gz: "📦",
	};

	return iconMap[extension] || "📄";
}

/**
 * Check if MIME type represents a code file
 */
function isCodeFile(mimeType: string, filename?: string): boolean {
	const codeTypes = [
		"text/javascript",
		"application/javascript",
		"text/html",
		"text/css",
		"application/json",
		"text/xml",
		"application/xml",
	];

	if (codeTypes.includes(mimeType)) {
		return true;
	}

	// Check by extension if filename is provided
	if (filename) {
		const ext = getFileExtension(filename);
		const codeExtensions = [
			"js",
			"ts",
			"jsx",
			"tsx",
			"html",
			"css",
			"json",
			"xml",
			"py",
			"java",
			"cpp",
			"c",
			"cs",
			"php",
			"rb",
			"go",
			"rs",
			"swift",
			"kt",
		];
		return codeExtensions.includes(ext);
	}

	return false;
}

/**
 * Check if MIME type represents an office document
 */
function isOfficeFile(mimeType: string): boolean {
	const officeTypes = [
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
		"application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
		"application/msword", // .doc
		"application/vnd.ms-excel", // .xls
		"application/vnd.ms-powerpoint", // .ppt
	];

	return officeTypes.includes(mimeType);
}

/**
 * Check if MIME type represents an archive file
 */
function isArchiveFile(mimeType: string): boolean {
	const archiveTypes = [
		"application/zip",
		"application/x-rar-compressed",
		"application/x-7z-compressed",
		"application/x-tar",
		"application/gzip",
	];

	return archiveTypes.includes(mimeType);
}
