// TODO: Turn this into the typing file for the front end

import type { ComponentType } from "react";

export interface FileItem {
	id: string;
	name: string;
	type: "folder" | "document" | "image" | "video";
	size?: string;
	modified: string;
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

export interface UploadFolderDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onUpload: (files: FileList) => void;
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

export interface DeleteFileParams {
	id: string;
}

export type Params = Record<string, string | number | null | undefined>;

export type CreateRequestOptions = {
	path: string;
	pathParams?: Params;
	queryParams?: Params;
};

export type UseRequestParams = {
	request: (signal: AbortSignal) => Promise<Response>;
	triggers?: unknown[];
	manual?: boolean;
};

export type UseRequestReturn<ResponseBody> = {
	data: ResponseBody | null;
	error: Error | null;
	isLoading: boolean;
	refetch: () => void;
};

export type AxiosError = {
	response?: {
		data?: {
			message?: string;
		};
	};
	message: string;
};

export interface CreateFolderParams {
	name: string;
	parentId?: string;
}
