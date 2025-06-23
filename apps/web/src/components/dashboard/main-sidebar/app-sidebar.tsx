"use client";

import { type ComponentProps } from "react";

import SidebarFolders from "@/components/dashboard/main-sidebar/sidebar-folders";
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import StorageFooter from "@/components/dashboard/main-sidebar/sidebar-footer";
import TagMenu from "@/components/dashboard/main-sidebar/tag-menu";

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar {...props} className="px-0 dark:bg-neutral-800">
			<SidebarHeader className="dark:bg-neutral-800">Account Component</SidebarHeader>

			{/* Upload Section */}
			<SidebarContent className="dark:bg-neutral-800">
				{/* Quick Access */}
				<p>Search bar</p>
				<p>Notification Button</p>
				<p>Starred Button</p>

				{/* Folders */}
				<SidebarFolders />

				{/* Tags */}
				<TagMenu />
			</SidebarContent>

			<StorageFooter />
		</Sidebar>
	);
}
