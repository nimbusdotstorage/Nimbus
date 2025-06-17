"use client";

import { useState, type ComponentProps } from "react";

import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import SidebarFolders from "@/components/main-sidebar/sidebar-folders";
import StorageFooter from "@/components/main-sidebar/sidebar-footer";
import { QuickAccess } from "@/components/main-sidebar/quick-access";
import UploadButton from "@/components/main-sidebar/upload";
import TagMenu from "@/components/main-sidebar/tag-menu";
import Sources from "@/components/main-sidebar/sources";
import { HardDrive, Users, Server } from "lucide-react";
import GoogleDriveIcon from "@/public/googledrive";
import OneDriveIcon from "@/public/onedrive";
import GoogleCloudIcon from "@/public/gcp";
import type { Source } from "@/lib/types";
import AzureIcon from "@/public/azure";
import AWSIcon from "@/public/aws";

const fileSources = [
	{
		name: "Local Storage",
		icon: HardDrive,
		value: "local",
		backgroundColor: "bg-white",
		textColor: "text-black",
	},
	{
		name: "Google Drive",
		icon: GoogleDriveIcon,
		value: "google-drive",
		backgroundColor: "bg-blue-100",
	},
	{
		name: "OneDrive",
		icon: OneDriveIcon,
		value: "onedrive",
		backgroundColor: "bg-blue-200",
	},
	{
		name: "S3",
		icon: AWSIcon,
		value: "s3",
		backgroundColor: "bg-neutral-700",
	},
	{
		name: "GCP",
		icon: GoogleCloudIcon,
		value: "gcp",
		backgroundColor: "bg-red-100",
	},
	{
		name: "Azure",
		icon: AzureIcon,
		value: "azure",
		backgroundColor: "bg-blue-300",
	},
	{
		name: "NAS",
		icon: Server,
		value: "nas",
		backgroundColor: "bg-white",
		textColor: "text-black",
	},
	{
		name: "Shared Folders",
		icon: Users,
		value: "shared",
		backgroundColor: "bg-white",
		textColor: "text-black",
	},
];

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
	const [selectedSource, setSelectedSource] = useState(fileSources[0] as Source);

	return (
		<Sidebar {...props} collapsible="icon">
			<SidebarHeader>
				<Sources selectedSource={selectedSource} setSelectedSource={setSelectedSource} fileSources={fileSources} />
			</SidebarHeader>

			{/* Upload Section */}
			<SidebarContent>
				{/* <UploadButton /> */}
				<UploadButton />

				{/* Quick Access */}
				<QuickAccess />

				{/* Folders */}
				<SidebarFolders />

				{/* Tags */}
				<TagMenu />
			</SidebarContent>

			<StorageFooter />

			<SidebarRail />
		</Sidebar>
	);
}
