import type { FileTreeNode } from "@/lib/types";

/**
 * Convert Google Drive API response to FileTreeNode structure
 * @param files Raw files from Google Drive API
 * @returns Array of FileTreeNode objects
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertToTreeNodes(files: any[]): FileTreeNode[] {
	return files.map(file => {
		// Convert mimeType to type
		let type: "folder" | "document" | "image" | "video" = "document";

		if (file.mimeType === "application/vnd.google-apps.folder") {
			type = "folder";
		} else if (file.mimeType?.startsWith("image/")) {
			type = "image";
		} else if (file.mimeType?.startsWith("video/")) {
			type = "video";
		}

		return {
			id: file.id,
			name: file.name,
			type,
			size: file.size,
			modified: file.modifiedTime || file.modified,
			tags: file.tags || [],
			children: [],
			isExpanded: false,
			isLoading: false,
		};
	});
}

/**
 * Update node children in the tree structure
 * @param nodes Current tree nodes
 * @param targetId ID of the node to update
 * @param children New children to set
 * @returns Updated tree nodes
 */
export function updateNodeChildren(nodes: FileTreeNode[], targetId: string, children: FileTreeNode[]): FileTreeNode[] {
	return nodes.map(node => {
		if (node.id === targetId) {
			return { ...node, children, isLoading: false };
		}
		if (node.children) {
			return {
				...node,
				children: updateNodeChildren(node.children, targetId, children),
			};
		}
		return node;
	});
}

/**
 * Find a node by ID in the tree structure
 * @param nodes Tree nodes to search
 * @param targetId ID to find
 * @returns Found node or null
 */
export function findNodeById(nodes: FileTreeNode[], targetId: string): FileTreeNode | null {
	for (const node of nodes) {
		if (node.id === targetId) {
			return node;
		}
		if (node.children) {
			const found = findNodeById(node.children, targetId);
			if (found) return found;
		}
	}
	return null;
}

/**
 * Get the path to a node in the tree
 * @param nodes Tree nodes to search
 * @param targetId ID to find
 * @returns Array of node IDs representing the path
 */
export function getNodePath(nodes: FileTreeNode[], targetId: string): string[] {
	const path: string[] = [];

	function search(nodes: FileTreeNode[], targetId: string): boolean {
		for (const node of nodes) {
			path.push(node.id);
			if (node.id === targetId) {
				return true;
			}
			if (node.children && search(node.children, targetId)) {
				return true;
			}
			path.pop();
		}
		return false;
	}

	search(nodes, targetId);
	return path;
}
