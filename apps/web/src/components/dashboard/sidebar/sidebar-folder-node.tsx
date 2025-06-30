import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from "@/components/ui/sidebar";
import { ChevronDown, FileText, Folder, FolderOpen, ImageIcon, Video } from "lucide-react";
import type { FileTreeNode } from "@/lib/types";
import { cn } from "@/lib/utils";

export function SidebarFolderNode({
	node,
	expandedNodes,
	folderRefs,
	handleFolderClick,
	handleNodeExpand,
	handleNodeCollapse,
	handleFolderHover,
	prefetchingNodes,
}: {
	node: FileTreeNode;
	expandedNodes: Set<string>;
	folderRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
	handleFolderClick: (id: string) => void;
	handleNodeExpand: (id: string) => void;
	handleNodeCollapse: (id: string) => void;
	handleFolderHover: (id: string) => void;
	prefetchingNodes: Set<string>;
}) {
	const isExpanded = expandedNodes.has(node.id);

	const handleOpenChange = (isOpen: boolean) => {
		if (node.type !== "folder") return;
		if (isOpen) {
			void handleNodeExpand(node.id);
		} else {
			void handleNodeCollapse(node.id);
		}
	};

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
		<Collapsible key={node.id} className="group/collapsible" open={isExpanded} onOpenChange={handleOpenChange}>
			<SidebarMenuItem>
				<CollapsibleTrigger asChild>
					<div
						ref={el => {
							folderRefs.current[node.id] = el;
							return undefined;
						}}
					>
						<SidebarMenuButton
							className="cursor-pointer px-3"
							tooltip={node.name}
							onClick={() => {
								handleFolderClick(node.id);
							}}
							onMouseEnter={() => {
								if (node.type === "folder") {
									void handleFolderHover(node.id);
								}
							}}
						>
							{getIcon(node.type, isExpanded)}
							<span className="group-data-[collapsible=icon]:sr-only">{node.name}</span>
							{node.type === "folder" && (
								<ChevronDown
									className={cn("ml-auto size-4 transition-transform duration-300", {
										"rotate-180": isExpanded,
									})}
								/>
							)}
						</SidebarMenuButton>
					</div>
				</CollapsibleTrigger>

				{node.children && node.children.length > 0 && (
					<CollapsibleContent>
						<SidebarMenuSub className="group-data-[collapsible=icon]:hidden">
							{node.children.map(child => (
								<SidebarFolderNode
									key={child.id}
									node={child}
									expandedNodes={expandedNodes}
									folderRefs={folderRefs}
									handleFolderClick={handleFolderClick}
									handleNodeExpand={handleNodeExpand}
									handleNodeCollapse={handleNodeCollapse}
									handleFolderHover={handleFolderHover}
									prefetchingNodes={prefetchingNodes}
								/>
							))}
						</SidebarMenuSub>
					</CollapsibleContent>
				)}
			</SidebarMenuItem>
		</Collapsible>
	);
}
