"use client";

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Folder, ImageIcon, Video, FolderOpen, FileText } from "lucide-react";
import { convertToTreeNodes, updateNodeChildren } from "@/lib/utils/tree-utils";
import { useRouter, useSearchParams } from "next/navigation";
import type { FileItem, FileTreeNode } from "@/lib/types";
import { createRequest } from "@/hooks/createRequest";
import { useRequest } from "@/hooks/useRequest";
import { Loader } from "@/components/loader";
import { useState, useEffect } from "react";

export default function SidebarFolders() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const type = searchParams.get("type");
	const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
	const [treeData, setTreeData] = useState<FileTreeNode[]>([]);
	const [prefetchingNodes, setPrefetchingNodes] = useState<Set<string>>(new Set());

	const fetchFiles = createRequest({
		path: "/files",
		queryParams: { type },
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

	const getIcon = (type: string, expanded: boolean) => {
		switch (type) {
			case "folder":
				return expanded ? <FolderOpen className="size-4" /> : <Folder className="size-4" />;
			case "image":
				return <ImageIcon className="size-4" />;
			case "video":
				return <Video className="size-4" />;
			case "document":
			default:
				return <FileText className="size-4" />;
		}
	};

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
								<Collapsible key={folder.id} className="group/collapsible" open={expandedNodes.has(folder.id)}>
									<SidebarMenuItem>
										<CollapsibleTrigger asChild>
											<SidebarMenuButton
												className="cursor-pointer px-3"
												tooltip={folder.name}
												onClick={() => {
													handleFolderClick(folder.id);
													if (folder.type === "folder") {
														if (expandedNodes.has(folder.id)) {
															void handleNodeCollapse(folder.id);
														} else {
															void handleNodeExpand(folder.id);
														}
													}
												}}
												onMouseEnter={() => {
													if (folder.type === "folder") {
														void handleFolderHover(folder.id);
													}
												}}
											>
												{getIcon(folder.type, expandedNodes.has(folder.id))}

												<span className="group-data-[collapsible=icon]:sr-only">{folder.name}</span>
												{folder.type === "folder" && (
													<ChevronDown className="ml-auto size-4 transition-transform duration-300 group-data-[state=open]/collapsible:rotate-180" />
												)}
											</SidebarMenuButton>
										</CollapsibleTrigger>

										{folder.children && folder.children.length > 0 && (
											<CollapsibleContent>
												<SidebarMenuSub className="group-data-[collapsible=icon]:hidden">
													{folder.children.map(subfolder => (
														<SidebarMenuSubItem key={subfolder.id}>
															<SidebarMenuSubButton className="w-full cursor-pointer">
																<span>{subfolder.name}</span>
															</SidebarMenuSubButton>
														</SidebarMenuSubItem>
													))}
												</SidebarMenuSub>
											</CollapsibleContent>
										)}
									</SidebarMenuItem>
								</Collapsible>
							))}
						</SidebarMenu>
					)}
				</SidebarGroupContent>
			</SidebarGroup>
		</>
	);
}
