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

	/**
	 * List files in the user's Google Drive.
	 */
	async listFiles(): Promise<File[]> {
		const response = await this.drive.files.list();

		if (!response.files) {
			return [];
		}

		// Normalize and type the result
		return response.files as File[];
	}

	async getFileById(id: string): Promise<File | null> {
		const response = await this.drive.files.retrieve(id, {});
		if (!response) {
			return null;
		}

		return response as File;
	}

	// Update file method
	// Needs to be used to update data like name
	// Folders are also files in Google Drive

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
		} catch (error) {
			console.error("Error deleting file from Google Drive:", error);
			return false;
		}
	}

	// Copy file method

	// Export (download as MIME type) file method
}
