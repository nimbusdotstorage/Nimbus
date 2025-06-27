// This file holds all the custom interfaces and types for the Next.js front end app.
import type { ChangeEvent, ComponentProps, ReactNode } from "react";
import type { Button } from "@/components/ui/button";
import type { Input } from "@/components/ui/input";

export interface File {
	id: string;
	name: string;
	parents: string[];
	// TODO: (string or number): determine how Google, OneDrive, etc format their size and how to convert them. a string that represent bytes might make sense
	size: string | null;
	// TODO: (format): determine how Google, OneDrive, etc format their dates
	creationDate: string | null;
	modificationDate: string | null;
	tags?: Tag[];
}

export interface Tag {
	id: string;
	name: string;
	color: string;
	parentId?: string | null;
	userId: string;
	createdAt: string;
	updatedAt: string;
	_count?: number; // Number of files tagged with this tag
	children?: Tag[]; // For nested tags
}

export interface CreateFolderDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onCreateFolder: (folderName: string, parentId?: string | undefined) => void;
}

export interface UploadFileDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onUpload: (files: FileList) => void;
}

export interface AuthState {
	isLoading: boolean;
	error: string | null;
}

export interface DeleteFileParams {
	id: string;
}

export interface AuthCardProps extends ComponentProps<"div"> {
	title: string;
	description: string;
	navigationType: "signin" | "signup";
	children: ReactNode;
}

export interface CreateFolderParams {
	name: string;
	parentId?: string;
}

type SocialProvider = "google" | "microsoft";
type AuthAction = "signin" | "signup";

export interface SocialAuthButtonProps extends Omit<ComponentProps<typeof Button>, "children" | "variant" | "type"> {
	provider: SocialProvider;
	action: AuthAction;
}

export interface PasswordInputProps extends Omit<ComponentProps<typeof Input>, "type"> {
	value?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface DriveInfo {
	usage: string;
	limit: string;
	usageInTrash: string;
}
