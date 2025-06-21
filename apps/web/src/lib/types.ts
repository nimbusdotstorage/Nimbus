// This file holds all the custom interfaces and types for the Next.js front end app.
import type { ChangeEvent, ComponentProps, ComponentType, ReactNode } from "react";
import type { Button } from "@/components/ui/button";
import type { Input } from "@/components/ui/input";

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

export interface FileItem {
	id: string;
	name: string;
	type: "folder" | "document" | "image" | "video";
	size?: string;
	modified: string;
}

export interface FolderContentItem extends FileItem {
	path?: string;
}

export interface Source {
	name: string;
	icon: ComponentType<{ className?: string }>;
	value: string;
	backgroundColor: string;
	textColor?: string;
}

export interface AuthState {
	isLoading: boolean;
	error: string | null;
}

export interface AuthCardProps extends ComponentProps<"div"> {
	title: string;
	description: string;
	navigationType: "signin" | "signup";
	children: ReactNode;
}

export type Params = Record<string, string | number | null | undefined>;

export interface CreateRequestOptions {
	path: string;
	pathParams?: Params;
	queryParams?: Params;
}

export interface UseRequestParams {
	request: (signal: AbortSignal) => Promise<Response>;
	triggers?: unknown[];
	manual?: boolean;
}

export interface UseRequestReturn<ResponseBody> {
	data: ResponseBody | null;
	error: Error | null;
	isLoading: boolean;
	refetch: () => Promise<void>;
}

export type SocialProvider = "google";
export type AuthAction = "signin" | "signup";

export interface SocialAuthButtonProps extends Omit<ComponentProps<typeof Button>, "children" | "variant" | "type"> {
	provider: SocialProvider;
	action: AuthAction;
}

export interface PasswordInputProps extends Omit<ComponentProps<typeof Input>, "type"> {
	value?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

// File API request types
export interface GetFileParams {
	id: string;
}

export interface CreateFileParams {
	name: string;
	parentId?: string;
	mimeType?: string;
	// 'string' for base64 encoded data, though Blob/File is preferred
	fileContent?: Blob | GoogleDriveFile | ArrayBuffer | ReadableStream | string;
}

export interface CreateFolderParams {
	name: string;
	parentId?: string;
}

export interface DeleteFileParams {
	id: string;
}

export interface UpdateFileParams {
	id: string;
	name?: string;
	parentId?: string;
}

// File API response types
export interface GoogleDriveFile {
	id?: string;
	// Links for exporting Docs Editors files to specific formats (docx, pdf, png, etc.)
	createdTime?: string;
	exportLinks?: Record<string, string>;
	//Only for binary files (non-google files)
	fileExtension?: string;
	fullFileExtension?: string;
	iconLink?: string;
	mimeType?: string;
	modifiedTime?: string;
	name?: string;
	parents?: Array<string>;
	size?: string;
	starred?: boolean;
	trashed?: boolean;
	viewedByMeTime?: string;
	// For downloading binary files (non-google files)
	webContentLink?: string;
	// For opening in relevant Google file editor (Docs, Sheets, Slides)
	webViewLink?: string;
}

/**
 * A list of files, the kind of file it is, and the token for the next page of results
 */
export interface FileListResponse {
	files?: Array<GoogleDriveFile>;
	// Undefined if no more results are in the response
	nextPageToken?: string;
}
