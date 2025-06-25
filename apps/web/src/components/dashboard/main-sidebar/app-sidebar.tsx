"use client";

import { type ComponentProps } from "react";

import SidebarFolders from "@/components/dashboard/main-sidebar/sidebar-folders";
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import StorageFooter from "@/components/dashboard/main-sidebar/sidebar-footer";
import UserAccount from "@/components/dashboard/main-sidebar/user-account";
import { SearchBar } from "@/components/dashboard/main-sidebar/search-bar";
import TagMenu from "@/components/dashboard/main-sidebar/tag-menu";

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar {...props} className="px-0 dark:bg-neutral-800">
			<SidebarHeader className="gap-4 p-2 pt-0 dark:bg-neutral-800">
				<UserAccount />
				<SearchBar />
			</SidebarHeader>

			<SidebarContent className="dark:bg-neutral-800">
				{/* Notification Button
				Starred Button */}

				<SidebarFolders />

				{/* Tags */}
				<TagMenu />
			</SidebarContent>

			<StorageFooter />
		</Sidebar>
	);
}
