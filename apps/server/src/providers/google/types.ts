export interface FileListParams {
	access_token?: string;
	// Data format for response
	alt?: "json" | "media" | "proto";
	// ID of shared drive to search
	driveId?: string;

	fields?: string;
	// See https://developers.google.com/workspace/drive/api/reference/rest/v3/files/list#query-parameters
	// for syntax information.
	orderBy?: string;
	pageSize?: number;
	// Should be the value of 'nextPageToken' from the previous response.
	pageToken?: string;
	// See https://developers.google.com/workspace/drive/api/guides/search-files
	// and https://developers.google.com/workspace/drive/api/guides/ref-search-terms
	// for more information.
	q?: string;
}

export interface File {
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
 * A list of files, the kind of file it is, and the toek nfor the next page of results
 */
export interface FileListResponse {
	files?: Array<File>;
	// Undefined if no more results are in the response
	nextPageToken?: string;
}

export type FileOperationResponse = {
	success: boolean;
	message?: string;
};
