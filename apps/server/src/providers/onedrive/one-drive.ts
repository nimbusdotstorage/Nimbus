import { OneDrive } from "@nimbus/server/lib/one-drive/src/index";
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

		const res = await fetch(`https://graph.microsoft.com/v1.0/me/drive/items/${parentId}/children`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${this.accessToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name,
				folder: mimeType === "application/vnd.microsoft.folder" ? {} : undefined,
				file: mimeType !== "application/vnd.microsoft.folder" ? {} : undefined,
			}),
		});

		if (!res.ok) return null;
		return (await res.json()) as File;
	}

	async listFiles(): Promise<File[]> {
		const res = await fetch("https://graph.microsoft.com/v1.0/me/drive/root/children", {
			headers: {
				Authorization: `Bearer ${this.accessToken}`,
			},
		});

		if (!res.ok) return [];

		const data = (await res.json()) as { value: File[] };
		return data.value as File[];
	}

	async getFileById(id: string): Promise<File | null> {
		const res = await fetch(`https://graph.microsoft.com/v1.0/me/drive/items/${id}`, {
			headers: {
				Authorization: `Bearer ${this.accessToken}`,
			},
		});

		if (!res.ok) return null;
		return (await res.json()) as File;
	}

	async updateFile(fileId: string, name: string): Promise<File | null> {
		const res = await fetch(`https://graph.microsoft.com/v1.0/me/drive/items/${fileId}`, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${this.accessToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name }),
		});

		if (!res.ok) return null;
		return (await res.json()) as File;
	}

	async deleteFile(fileId: string): Promise<boolean> {
		const res = await fetch(`https://graph.microsoft.com/v1.0/me/drive/items/${fileId}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${this.accessToken}`,
			},
		});

		return res.status === 204;
	}
}
