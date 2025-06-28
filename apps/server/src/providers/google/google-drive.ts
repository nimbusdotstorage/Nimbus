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
			fields: "files(id, name, mimeType, size, createdTime, modifiedTime, trashed, parents)",
		});

		if (!response.files) {
			return [];
		}

		return response.files as File[];
	}

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

	// Drive methods //

	async getDriveUsageLimit() {
		const driveAbout = await this.drive.about.retrieve({
			fields: "storageQuota(limit, usage)",
		});

		if (!driveAbout) {
			return null;
		}

		return driveAbout.storageQuota;
	}
}
