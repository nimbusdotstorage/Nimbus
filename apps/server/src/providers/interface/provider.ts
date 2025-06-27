import type GoogleDrive from "@/lib/google-drive/src";
import type OneDrive from "@/lib/one-drive/src";
import type { File } from "./types";

type Drive = GoogleDrive | OneDrive;

export abstract class Provider<T extends Drive> {
	protected drive: T;

	constructor(drive: T) {
		this.drive = drive;
	}

	// Create file method
	// Can also be used to create a folder
	abstract createFile(name: string, mimeType: string, parents?: string[] | undefined): Promise<File | null>;

	/**
	 * List files in the user's Google Drive.
	 * @returns An array of files of type File
	 */
	abstract listFiles(): Promise<File[]>;

	/**
	 * Get a file by ID
	 * @param id The ID of the file to retrieve
	 * @returns The file of type File
	 */
	abstract getFileById(id: string): Promise<File | null>;

	/**
	 * Update a file from Google Drive
	 * Folders are also files in Google Drive
	 * @param fileId The ID of the file to update
	 * @param name The new name for the file
	 * @returns The updated file of type File
	 */
	abstract updateFile(fileId: string, name: string): Promise<File | null>;

	/**
	 * Delete a file from Google Drive
	 * @param fileId The ID of the file to delete
	 * @returns boolean indicating success
	 */
	abstract deleteFile(fileId: string): Promise<boolean>;

	// Copy file method

	// Export (download as MIME type) file method

	// Drive methods //

	// abstract getDriveUsageLimit(): Promise<StorageQuota | null>;
}
