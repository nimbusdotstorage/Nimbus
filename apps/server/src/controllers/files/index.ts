import type { Context } from "hono";

const sampleData = [
	{ id: "1", name: "Documents", type: "folder", modified: "May 15, 2024" },
	{ id: "2", name: "Images", type: "folder", modified: "May 12, 2024" },
	{ id: "3", name: "Project Proposal", type: "document", size: "2.4 MB", modified: "May 10, 2024" },
	{ id: "4", name: "Quarterly Report", type: "document", size: "4.2 MB", modified: "May 8, 2024" },
	{ id: "5", name: "Meeting Notes", type: "document", size: "1.1 MB", modified: "May 5, 2024" },
	{ id: "6", name: "Videos", type: "folder", modified: "May 3, 2024" },
];

export const getFiles = (c: Context) => {
	const type = c.req.query("type")?.toLowerCase() || "";
	const filteredData = sampleData.filter(item => !type || item.type.toLowerCase().includes(type));
	return c.json(filteredData);
};

export const getFileById = (c: Context) => {
	const { id } = c.req.param();
	const file = sampleData.find(item => item.id === id);

	if (!file) {
		return c.json({ message: "File not found" }, 404);
	}

	return c.json(file);
};
