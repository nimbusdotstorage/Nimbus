import { GoogleDrive } from "@nimbus/server/lib/google-drive/src/index";
import type { File, FileListResponse } from "@/providers/google/types";

export class GoogleDriveProvider {
	private drive: GoogleDrive;

	constructor(accessToken: string) {
		this.drive = new GoogleDrive({ accessToken });
	}

	//////////////////////////////
	// File API request methods //
	//////////////////////////////

	/**
	 * Create a file in the users Google Drive. Can be used to upload files.
	 * @param name The name of the file
	 * @param mimeType The MIME type of the file
	 * @param parents The IDs of the parent folders
	 * @returns A file of type File
	 */
	// TODO: file upload support. See docs https://developers.google.com/workspace/drive/api/guides/manage-uploads#node.js
	// Might need to update the SDK to pass the file stream to the body of the request.
	async createFile(name: string, mimeType: string, parents?: string[] | undefined): Promise<File | null> {
		const response = await this.drive.files.create({
			name,
			parents,
			mimeType,
		});

		if (!response) {
			return null;
		}

		return response as File;
	}

	/**
	 * Create a folder in the users Google Drive.
	 * @param name The name of the folder
	 * @param parents The IDs of the parent folders
	 * @returns An array of files of type File, a nextPageToken if available
	 */
	async createFolder(name: string, parents?: string[] | undefined): Promise<File | null> {
		try {
			if (!name) {
				throw new Error("Folder name is required");
			}

			const response = await this.drive.files.create({
				name,
				parents,
				mimeType: "application/vnd.google-apps.folder",
			});

			if (!response) {
				throw new Error("Failed to create folder - no response received");
			}

			return response as File;
		} catch (error) {
			console.error("Error creating folder:", error);
			return null;
		}
	}

	/**
	 * List files in the user's Google Drive.
	 * @param pageSize The maximum number of files to return
	 * @param pageToken The token for the next page of results
	 * @returns An array of files of type File, a nextPageToken if available
	 */
	async listFiles(pageSize: number = 10, pageToken?: string): Promise<FileListResponse> {
		const response = await this.drive.files.list({
			fields: `files(id, name, mimeType, size, starred, createdTime, modifiedTime, trashed, parents, exportLinks), nextPageToken`,
			pageSize,
			pageToken,
			includeLabels: "true",
		});

		if (!response || !response.files) {
			return {
				files: [],
				nextPageToken: undefined,
			};
		}

		return response as FileListResponse;
	}

	/**
	 * Update a file from Google Drive
	 * Folders are also files in Google Drive
	 * @param fileId The ID of the file to get
	 * @returns The file of type File
	 */
	async getFileById(id: string): Promise<File | null> {
		const response = await this.drive.files.retrieve(id, {
			fields: "id, name, mimeType, size, createdTime, modifiedTime, trashed, parents",
		});

		if (!response) {
			return null;
		}

		return response as File;
	}

	/**
	 * Update a file from Google Drive
	 * Folders are also files in Google Drive
	 * @param fileId The ID of the file to update
	 * @param name The new name for the file
	 * @returns The updated file of type File
	 */
	async updateFile(fileId: string, name: string): Promise<File | null> {
		const response = await this.drive.files.update(fileId, {
			name,
		});

		if (!response) {
			return null;
		}

		return response as File;
	}

	/**
	 * Delete a file from Google Drive
	 * @param fileId The ID of the file to delete
	 * @returns boolean indicating success
	 */
	async deleteFile(fileId: string): Promise<boolean> {
		try {
			await this.drive.files.delete(fileId, {
				supportsAllDrives: false,
			});
			return true;
		} catch {
			return false;
		}
	}

	// Copy file method

	// Export (download as MIME type) file method
}
