import { OneDrive } from "@nimbus/server/lib/one-drive/src/client";
import type { File } from "@/providers/onedrive/types";

export class OneDriveProvider {
	private drive: OneDrive;
	private accessToken: string;

	constructor(accessToken: string) {
		this.accessToken = accessToken;
		this.drive = new OneDrive({ accessToken });
	}

	// Create file or folder
	async createFile(name: string, mimeType: string, parents?: string[]): Promise<File | null> {
		const parentId = parents?.[0] || "root";

		const res: Response = await this.drive.post(`/me/drive/items/${parentId}/children`, {
			body: {
				name,
				folder: mimeType === "application/vnd.microsoft.folder" ? {} : undefined,
				file: mimeType !== "application/vnd.microsoft.folder" ? {} : undefined,
			},
			headers: {
				Authorization: `Bearer ${this.accessToken}`,
			},
		});

		if (!res.ok) return null;
		return (await res.json()) as File;
	}

	async listFiles(): Promise<File[]> {
		const res: Response = await this.drive.get(`/me/drive/root/children`, {
			headers: {
				Authorization: `Bearer ${this.accessToken}`,
			},
		});

		if (!res.ok) return [];
		const data = (await res.json()) as { value: File[] };
		return data.value;
	}

	async getFileById(id: string): Promise<File | null> {
		const res: Response = await this.drive.get(`/me/drive/items/${id}`, {
			headers: {
				Authorization: `Bearer ${this.accessToken}`,
			},
		});

		if (!res.ok) return null;
		return (await res.json()) as File;
	}

	async updateFile(fileId: string, name: string): Promise<File | null> {
		const res: Response = await this.drive.patch(`/me/drive/items/${fileId}`, {
			body: { name },
			headers: {
				Authorization: `Bearer ${this.accessToken}`,
				"Content-Type": "application/json",
			},
		});

		if (!res.ok) return null;
		return (await res.json()) as File;
	}

	async deleteFile(fileId: string): Promise<boolean> {
		const res: Response = await this.drive.delete(`/me/drive/items/${fileId}`, {
			headers: {
				Authorization: `Bearer ${this.accessToken}`,
			},
		});

		return res.status === 204;
	}
}
