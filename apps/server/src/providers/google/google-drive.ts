import { GoogleDrive } from "@nimbus/server/lib/google-drive/src/index";
import type { File } from "@/providers/google/types";
// import type { FileListParams } from "lib/google-drive/src/resources";

export class GoogleDriveProvider {
	private drive: GoogleDrive;

	constructor(accessToken: string) {
		this.drive = new GoogleDrive({ accessToken });
	}

	// Create file method
	// Can also be used to create a folder
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
	 * List files in the user's Google Drive.
	 * @returns An array of files of type File
	 */
	async listFiles(): Promise<File[]> {
		const response = await this.drive.files.list({
			fields:
				"files(id, name, mimeType, size, createdTime, modifiedTime, trashed, parents, thumbnailLink, hasThumbnail, webContentLink, webViewLink, iconLink)",
			q: "trashed=false", // Filter out trashed files
		});

		if (!response.files) {
			return [];
		}

		return response.files as File[];
	}

	async getFileById(id: string): Promise<File | null> {
		const response = await this.drive.files.retrieve(id, {
			fields:
				"id, name, mimeType, size, createdTime, modifiedTime, trashed, parents, thumbnailLink, hasThumbnail, webContentLink, webViewLink, iconLink",
		});

		if (!response) {
			return null;
		}

		return response as File;
	}

	/**
	 * Get file content/binary data for preview
	 * @param fileId The ID of the file to retrieve content for
	 * @returns Binary content of the file
	 */
	async getFileContent(fileId: string): Promise<ArrayBuffer | Buffer | string | null> {
		try {
			const response = await this.drive.files.retrieve(fileId, { alt: "media" });
			return response as ArrayBuffer | Buffer | string;
		} catch (error) {
			console.error("Error getting file content:", error);
			return null;
		}
	}

	/**
	 * Check if a MIME type represents a Google Workspace document
	 * @param mimeType The MIME type to check
	 * @returns True if it's a Google Workspace document
	 */
	static isGoogleWorkspaceDoc(mimeType?: string): boolean {
		if (!mimeType) return false;

		const googleWorkspaceMimeTypes = [
			"application/vnd.google-apps.document", // Google Docs
			"application/vnd.google-apps.spreadsheet", // Google Sheets
			"application/vnd.google-apps.presentation", // Google Slides
		];

		return googleWorkspaceMimeTypes.includes(mimeType);
	}

	/**
	 * Get the appropriate export MIME type for a Google Workspace document
	 * @param mimeType The Google Workspace MIME type
	 * @returns The export MIME type (e.g., PDF)
	 */
	static getExportMimeType(mimeType: string): string {
		const exportMimeTypes: { [key: string]: string } = {
			"application/vnd.google-apps.document": "application/pdf",
			"application/vnd.google-apps.spreadsheet": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			"application/vnd.google-apps.presentation":
				"application/vnd.openxmlformats-officedocument.presentationml.presentation",
		};

		return exportMimeTypes[mimeType] || "application/pdf";
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

	/**
	 * Get drive usage and storage limits
	 * @returns Drive storage details including usage and limit
	 */
	async getDriveUsageLimit(): Promise<{ limit: number; usage: number } | null> {
		try {
			const response = await this.drive.about.retrieve({
				fields: "storageQuota",
			});

			if (!response.storageQuota) {
				return null;
			}

			const limit = response.storageQuota.limit ? parseInt(response.storageQuota.limit) : 0;
			const usage = response.storageQuota.usage ? parseInt(response.storageQuota.usage) : 0;

			return { limit, usage };
		} catch (error) {
			console.error("Error getting drive usage:", error);
			return null;
		}
	}
}
