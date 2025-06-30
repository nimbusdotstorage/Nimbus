"use client";

import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu } from "@/components/ui/sidebar";
import { convertToTreeNodes, updateNodeChildren } from "@/lib/utils/tree-utils";
import { useRouter, useSearchParams } from "next/navigation";
import { SidebarFolderNode } from "./sidebar-folder-node";
import type { FileItem, FileTreeNode } from "@/lib/types";
import { createRequest } from "@/hooks/createRequest";
import { useState, useEffect, useRef } from "react";
import { useRequest } from "@/hooks/useRequest";
import { Loader } from "@/components/loader";

export default function SidebarFolders() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const type = searchParams.get("type");
	const selectedFolderId = searchParams.get("folderId");
	const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
	const [treeData, setTreeData] = useState<FileTreeNode[]>([]);
	const [prefetchingNodes, setPrefetchingNodes] = useState<Set<string>>(new Set());
	const folderRefs = useRef<Record<string, HTMLDivElement | null>>({});

	const fetchFiles = createRequest({
		path: "/files",
		queryParams: { type, parentId: "root" },
	});

	const { data, refetch, isLoading, error } = useRequest<FileItem[]>({
		request: fetchFiles,
		triggers: [type],
	});

	useEffect(() => {
		if (data && treeData.length === 0) {
			const nodes = convertToTreeNodes(data);
			setTreeData(nodes);
		}
	}, [data, treeData.length]);

	useEffect(() => {
		if (selectedFolderId && folderRefs.current[selectedFolderId]) {
			folderRefs.current[selectedFolderId]?.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	}, [selectedFolderId, expandedNodes]);

	const fetchChildren = async (parentId: string): Promise<FileTreeNode[]> => {
		const request = createRequest({
			path: "/files/children/:parentId",
			pathParams: { parentId },
		});

		try {
			const response = await request(new AbortController().signal);
			const data = await response.json();
			return convertToTreeNodes(data);
		} catch (error) {
			console.error("Error fetching children:", error);
			return [];
		}
	};

	const handleFolderClick = (folderId: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("folderId", folderId);
		router.push(`?${params.toString()}`);
	};

	const handleFolderHover = async (nodeId: string) => {
		if (prefetchingNodes.has(nodeId) || expandedNodes.has(nodeId)) {
			return;
		}

		setPrefetchingNodes(prev => new Set([...prev, nodeId]));

		try {
			const request = createRequest({
				path: "/files/children/:parentId/prefetch",
				pathParams: { parentId: nodeId },
			});

			await request(new AbortController().signal);
		} catch (error) {
			console.error("Error prefetching children:", error);
		} finally {
			setPrefetchingNodes(prev => {
				const newSet = new Set(prev);
				newSet.delete(nodeId);
				return newSet;
			});
		}
	};

	const handleNodeExpand = async (nodeId: string) => {
		setTreeData(prev => prev.map(node => (node.id === nodeId ? { ...node, isLoading: true } : node)));

		const children = await fetchChildren(nodeId);

		setTreeData(prev => updateNodeChildren(prev, nodeId, children));
		setExpandedNodes(prev => new Set([...prev, nodeId]));
	};

	const handleNodeCollapse = (nodeId: string) => {
		setExpandedNodes(prev => {
			const newSet = new Set(prev);
			newSet.delete(nodeId);
			return newSet;
		});
	};

	const folders = treeData.length > 0 ? treeData : data ? convertToTreeNodes(data) : [];

	return (
		<>
			<SidebarGroup>
				<SidebarGroupLabel>Folders</SidebarGroupLabel>
				<SidebarGroupContent>
					{isLoading ? (
						<div className="text-muted-foreground p-4 text-center">
							<Loader />
						</div>
					) : error ? (
						<div className="text-destructive p-4 text-center">
							<div>Failed to load folders.</div>
							<button className="text-primary mt-2 underline" onClick={() => refetch()}>
								Retry
							</button>
						</div>
					) : (
						<SidebarMenu>
							{folders.map(folder => (
								<SidebarFolderNode
									key={folder.id}
									node={folder}
									expandedNodes={expandedNodes}
									folderRefs={folderRefs}
									handleFolderClick={handleFolderClick}
									handleNodeExpand={handleNodeExpand}
									handleNodeCollapse={handleNodeCollapse}
									handleFolderHover={handleFolderHover}
									prefetchingNodes={prefetchingNodes}
								/>
							))}
						</SidebarMenu>
					)}
				</SidebarGroupContent>
			</SidebarGroup>
		</>
	);
}
