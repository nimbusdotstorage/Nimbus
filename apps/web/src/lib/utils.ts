import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { FileItem, SortConfig, SortDirection, SortField } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// File size conversion utility for sorting
export function formatFileSize(sizeStr?: string): number {
	if (!sizeStr) return 0;
	const size = parseInt(sizeStr);
	if (isNaN(size)) return 0;
	return size;
}

// File size display utility for UI
export function formatFileSizeDisplay(sizeStr?: string): string {
	if (!sizeStr) return "—";
	
	const bytes = parseInt(sizeStr);
	if (isNaN(bytes)) return "—";
	
	const units = ["B", "KB", "MB", "GB", "TB"];
	let size = bytes;
	let unitIndex = 0;
	
	while (size >= 1024 && unitIndex < units.length - 1) {
		size /= 1024;
		unitIndex++;
	}
	
	return `${size.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

// Date parsing utility
export function parseFileDate(dateStr: string): Date {
	return new Date(dateStr);
}

// File sorting utilities
export function sortFiles(files: FileItem[], sortConfig: SortConfig): FileItem[] {
	const { field, direction } = sortConfig;
	
	const sortedFiles = [...files].sort((a, b) => {
		// Put folders first for all sorts except when sorting by type
		if (field !== "type") {
			if (a.type === "folder" && b.type !== "folder") return -1;
			if (a.type !== "folder" && b.type === "folder") return 1;
		}
		
		let comparison = 0;
		
		switch (field) {
			case "name":
				comparison = (a.name || "").toLowerCase().localeCompare((b.name || "").toLowerCase());
				break;
			case "modified":
				comparison = parseFileDate(a.modified).getTime() - parseFileDate(b.modified).getTime();
				break;
			case "size":
				comparison = formatFileSize(a.size) - formatFileSize(b.size);
				break;
			case "type": {
				// Define type priority order: folders first, then documents, images, videos, unknown
				const getTypePriority = (type?: string): number => {
					const priorities: Record<string, number> = {
						"folder": 0,
						"document": 1,
						"image": 2,
						"video": 3,
					};
					return priorities[type || ""] ?? 4; // Unknown types get lowest priority
				};
				
				const aPriority = getTypePriority(a.type);
				const bPriority = getTypePriority(b.type);
				
				if (aPriority !== bPriority) {
					comparison = aPriority - bPriority;
				} else {
					// If same type priority, sort alphabetically by type name
					const aType = a.type || "unknown";
					const bType = b.type || "unknown";
					comparison = aType.localeCompare(bType);
				}
				break;
			}
		}
		
		return direction === "asc" ? comparison : -comparison;
	});
	
	return sortedFiles;
}

export function toggleSortDirection(currentDirection: SortDirection): SortDirection {
	return currentDirection === "asc" ? "desc" : "asc";
}

export function getSortIcon(field: SortField, currentSort: SortConfig): "asc" | "desc" | null {
	if (currentSort.field !== field) return null;
	return currentSort.direction;
}
