// TODO: Turn this into the typing file for the front end

export interface FileItem {
	id: string;
	name: string;
	type: "folder" | "document" | "image" | "video";
	size?: string;
	modified: string;
}
