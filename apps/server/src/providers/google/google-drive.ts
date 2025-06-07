import { GoogleDrive } from "@/apps/server/lib/google-drive/src/index";
import type { File } from "@/providers/google/types";
// import type { FileListParams } from "lib/google-drive/src/resources";

// export type DriveFile = {
// 	id: string;
// 	name: string;
// 	mimeType: string;
// 	webViewLink?: string;
// 	modifiedTime?: string;
// 	size?: number;
// };

export class GoogleDriveProvider {
	private drive: GoogleDrive;

	constructor(accessToken: string) {
		this.drive = new GoogleDrive({ accessToken });
	}

	/**
	 * List files in the user's Google Drive.
	 */
	async listFiles(): Promise<File[]> {
		const response = await this.drive.files.list();

		if (!response.files) {
			return [];
		}

		console.log(response.files);

		// Normalize and type the result
		return response.files as File[];
	}
}
