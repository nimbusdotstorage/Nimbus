import type { DriveInfo, File } from "@/providers/interface/types";
import type { Provider } from "@/providers/interface/provider";
import { OAuth2Client } from "google-auth-library";
import { drive_v3 } from "@googleapis/drive";
// import fs from "fs";

export class GoogleDriveProvider implements Provider {
	private drive: drive_v3.Drive;

	constructor(accessToken: string) {
		const oauth2Client = new OAuth2Client();
		oauth2Client.setCredentials({ access_token: accessToken });
		this.drive = new drive_v3.Drive({ auth: oauth2Client });
	}

	/**
	 * List files in the user's Google Drive.
	 * @param parents The IDs of the parent folders to query files from
	 * @param pageSize The number of files to return per page
	 * @param returnedValues The values the file object will contain
	 * @param pageToken The next page token or URL for pagination
	 * @returns An array of files of type File, and the next page token
	 */
	async listFiles(
		parents: string[],
		pageSize: number,
		returnedValues: string,
		pageToken?: string
	): Promise<{ files: File[]; nextPageToken?: string }> {
		const response = await this.drive.files.list({
			// TODO: returnedValues when passed in will be an array of strings. Write a helper to convert it to the proper parameter for G Drive and OneDrive
			fields: returnedValues,
			pageSize,
			pageToken,
			q: parents?.length > 0 ? `'${parents[0]}' in parents` : undefined, // the ${parents[0]}' in parents specifies the folder to get the files from.
		});

		if (!response.data.files) {
			// TODO: implement either better error handling or better empty state on front end. Probably both...
			return { files: [] };
		}

		const files: File[] = response.data.files.map(file => convertGoogleDriveFileToProviderFile(file));

		return {
			files,
			nextPageToken: response.data.nextPageToken || undefined,
		};
	}

	async getFileById(id: string, returnedValues: string): Promise<File | null> {
		const response = this.drive.files.get({
			fileId: id,
			fields: returnedValues,
		});

		if (!response) {
			return null;
		}

		const file: File = convertGoogleDriveFileToProviderFile((await response).data);

		return file;
	}

	/**
	 *
	 * @param name
	 * @param mimeType
	 * @param parents
	 * @returns
	 */
	async createFile(
		name: string,
		mimeType: string,
		parents?: string[] | undefined
		// filePath?: string or something to get the file from the user file system
	): Promise<File | null> {
		const fileMetadata: { name: string; mimeType: string; parents?: string[] } = {
			name,
			mimeType,
			parents,
		};

		const response = await this.drive.files.create({
			media: {
				mimeType,
				// body: fs.createReadStream(filePath),
			},
			requestBody: fileMetadata,
			fields: "id, name, mimeType, parents", // this returns the file object with the specified fields
		});

		if (!response) {
			return null;
		}

		const file: File = convertGoogleDriveFileToProviderFile(response.data);

		return file;
	}

	/**
	 * Update a file from Google Drive
	 * Folders are also files in Google Drive
	 * @param fileId The ID of the file to update
	 * @param name The new name for the file
	 * @returns The updated file of type File
	 */
	async updateFile(fileId: string, name: string): Promise<File | null> {
		const response = await this.drive.files.update({
			fileId,
			requestBody: {
				name,
			},
			fields: "id, name, mimeType, parents", // this returns the file object with the specified fields
		});

		if (!response) {
			return null;
		}

		const file: File = convertGoogleDriveFileToProviderFile(response.data);

		return file;
	}

	/**
	 * Delete a file from Google Drive
	 * @param fileId The ID of the file to delete
	 * @returns boolean indicating success
	 */
	async deleteFile(fileId: string): Promise<boolean> {
		try {
			await this.drive.files.delete({
				fileId,
			});
			return true;
		} catch {
			return false;
		}
	}

	// Copy file method

	// Export (download as MIME type) file method

	// Drive methods

	async getDriveInfo(): Promise<DriveInfo | null> {
		const driveAbout = await this.drive.about.get({
			fields: "storageQuota(limit, usage, usageInDriveTrash)",
		});

		if (!driveAbout.data) {
			return null;
		}

		return {
			limit: driveAbout.data.storageQuota?.limit,
			usage: driveAbout.data.storageQuota?.usage,
			usageInTrash: driveAbout.data.storageQuota?.usageInDriveTrash,
		} as DriveInfo;
	}
}

function convertGoogleDriveFileToProviderFile(file: drive_v3.Schema$File): File {
	return {
		id: file.id || "",
		name: file.name || "",
		parents: file.parents || [],
		size: file.size ?? null,
		creationDate: file.createdTime ?? null,
		modificationDate: file.modifiedTime ?? null,
	};
}
