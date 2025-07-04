"use client";

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
} from "@/components/ui/sidebar";
import { ChevronDown, Folder, ImageIcon, Video, Music, Archive, Loader2, PinOff } from "lucide-react";
import { usePinnedFolders, useUnpinFolder } from "@/hooks/useDriveOps";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const containerVariants: Variants = {
	open: {
		opacity: 1,
		height: "auto",
		transition: {
			duration: 0.3,
			ease: "easeOut",
			staggerChildren: 0.1,
			delayChildren: 0.1,
		},
	},
	closed: {
		opacity: 0,
		height: 0,
		transition: {
			duration: 0.3,
			ease: "easeIn",
			staggerChildren: 0.05,
			staggerDirection: -1,
		},
	},
};

const itemVariants: Variants = {
	open: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.2,
			ease: "easeOut",
		},
	},
	closed: {
		opacity: 0,
		y: -10,
		transition: {
			duration: 0.2,
			ease: "easeIn",
		},
	},
};

// Helper to get a custom icon based on folder name
function getFolderIcon(name: string) {
	const lower = name.toLowerCase();
	if (lower.includes("image")) return ImageIcon;
	if (lower.includes("video")) return Video;
	if (lower.includes("music")) return Music;
	if (lower.includes("archive")) return Archive;
	if (lower.includes("document")) return Folder;
	if (lower.includes("download")) return Folder;
	return Folder;
}

export default function SidebarFolders() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(true);
	const { data: pinnedFolders, isLoading } = usePinnedFolders();
	const unpinFolder = useUnpinFolder();

	const handleUnpin = (id: string) => {
		unpinFolder.mutate(id);
	};

	const handleNavigate = (folderId: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("folderId", folderId);
		router.push(`?${params.toString()}`);
	};

	return (
		<SidebarGroup>
			<SidebarGroupLabel asChild>
				<Button
					variant="ghost"
					onClick={() => setIsOpen(!isOpen)}
					className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs font-medium transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-700"
				>
					Favorites
					<motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2, ease: "easeInOut" }}>
						<ChevronDown className="size-4" />
					</motion.div>
				</Button>
			</SidebarGroupLabel>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial="closed"
						animate="open"
						exit="closed"
						variants={containerVariants}
						style={{ overflow: "hidden" }}
					>
						<SidebarGroupContent className="max-h-64 overflow-y-auto pr-1">
							<SidebarMenu>
								{isLoading ? (
									<div className="flex items-center justify-center py-4">
										<Loader2 className="animate-spin" />
									</div>
								) : pinnedFolders && pinnedFolders.length > 0 ? (
									pinnedFolders.map(folder => {
										const Icon = getFolderIcon(folder.name);
										return (
											<motion.div key={folder.id} variants={itemVariants}>
												<SidebarMenuItem>
													<SidebarMenuButton
														className={cn(
															"group relative flex w-full cursor-pointer items-center justify-between gap-2 px-3 py-1.5 hover:bg-neutral-200 dark:hover:bg-neutral-700"
														)}
														tooltip={folder.name}
														onClick={() => handleNavigate(folder.folderId)}
													>
														<div className="flex min-w-0 items-center gap-2">
															<Icon className="size-4" />
															<span className="truncate">{folder.name}</span>
														</div>
														<span
															className={cn(
																"flex-shrink-0 cursor-pointer opacity-0 transition-opacity group-hover:opacity-100",
																unpinFolder.status === "pending" ? "pointer-events-none" : ""
															)}
															onClick={e => {
																e.stopPropagation();
																handleUnpin(folder.id);
															}}
															aria-label={`Unpin ${folder.name}`}
															tabIndex={-1}
															role="button"
														>
															<PinOff className="text-muted-foreground hover:text-destructive size-3" />
														</span>
													</SidebarMenuButton>
												</SidebarMenuItem>
											</motion.div>
										);
									})
								) : (
									<div className="text-muted-foreground px-3 py-2 text-xs">No pinned folders</div>
								)}
							</SidebarMenu>
						</SidebarGroupContent>
					</motion.div>
				)}
			</AnimatePresence>
		</SidebarGroup>
	);
}
