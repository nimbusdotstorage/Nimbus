import { createFileSchema, deleteFileSchema, getFileByIdSchema, getFilesSchema, updateFileSchema } from "@/validators";
import type { File } from "@/providers/interface/types";
import { TagService } from "@/routes/tags/tag-service";
import { getDriveManagerForUser } from "@/providers";
import { getAccount } from "@/lib/utils/accounts";
import type { ApiResponse } from "@/routes/types";
import type { Context } from "hono";
import { Hono } from "hono";

const filesRouter = new Hono();
const tagService = new TagService();

// Get all files in a specific folder. Folder ID will be passed via the url (optional). Defaults to root.
// When navigating, use the url to manage the state of which folders contents to display.
// folderId is parent folder id. Pass it as an array to the .get() method
filesRouter.get("/", async (c: Context) => {
	const user = c.get("user");
	if (!user) {
		return c.json<ApiResponse>({ success: false, message: "User not authenticated" }, 401);
	}

	const account = await getAccount(user, c.req.raw.headers);
	if (!account) {
		return c.json<ApiResponse>({ success: false, message: "Unauthorized access" }, 401);
	}

	const accessToken = account.accessToken;
	if (!accessToken) {
		return c.json<ApiResponse>({ success: false, message: "Unauthorized access" }, 401);
	}

	const { data, error } = getFilesSchema().safeParse(c.req.query());

	if (error) {
		return c.json<ApiResponse>({ success: false, message: error.errors[0]?.message }, 400);
	}

	const drive = await getDriveManagerForUser(user, c.req.raw.headers);
	const res = await drive.listFiles(data.parent, data.pageSize, data.returnedValues, data.pageToken);

	if (!res.files) {
		return c.json<ApiResponse>({ success: false, message: "Files not found" }, 404);
	}

	// Add tags to files
	const filesWithTags = await Promise.all(
		res.files.map(async file => {
			const tags = await tagService.getFileTags(file.id!, user.id);
			return { ...file, tags };
		})
	);

	return c.json(filesWithTags as File[]);
});

// Get a specific file from
// TODO: Grab fileId from url path, not the params
filesRouter.get("/:id", async (c: Context) => {
	const user = c.get("user");
	if (!user) {
		return c.json<ApiResponse>({ success: false, message: "User not authenticated" }, 401);
	}

	const account = await getAccount(user, c.req.raw.headers);
	if (!account) {
		return c.json<ApiResponse>({ success: false, message: "Unauthorized access" }, 401);
	}

	const accessToken = account.accessToken;
	if (!accessToken) {
		return c.json<ApiResponse>({ success: false, message: "Unauthorized access" }, 401);
	}

	// Validation
	const { error, data } = getFileByIdSchema.safeParse(c.req.param());
	if (error) {
		return c.json<ApiResponse>({ success: false, message: error.errors[0]?.message }, 400);
	}

	const fileId = data.fileId;
	if (!fileId) {
		return c.json<ApiResponse>({ success: false, message: "File ID not provided" }, 400);
	}

	const returnedValues = data.returnedValues;

	const drive = await getDriveManagerForUser(user, c.req.raw.headers);
	const file = await drive.getFileById(fileId, returnedValues);
	if (!file) {
		return c.json<ApiResponse>({ success: false, message: "File not found" }, 404);
	}

	// Add tags to file to be displayed
	const tags = await tagService.getFileTags(fileId, user.id);
	const fileWithTags = { ...file, tags };

	return c.json<File>(fileWithTags);
});

// Untested
filesRouter.put("/", async (c: Context) => {
	const user = c.get("user");
	if (!user) {
		return c.json<ApiResponse>({ success: false, message: "User not authenticated" }, 401);
	}

	const account = await getAccount(user, c.req.raw.headers);
	if (!account) {
		return c.json<ApiResponse>({ success: false, message: "Unauthorized access" }, 401);
	}

	// Validation
	const { error, data } = updateFileSchema.safeParse(c.req.query());
	if (error) {
		return c.json<ApiResponse>({ success: false, message: error.errors[0]?.message }, 400);
	}

	const fileId = data.fileId;
	const name = data.name;

	const accessToken = account.accessToken;
	if (!accessToken) {
		return c.json<ApiResponse>({ success: false, message: "Unauthorized access" }, 401);
	}

	const drive = await getDriveManagerForUser(user, c.req.raw.headers);
	const success = await drive.updateFile(fileId, name);

	if (!success) {
		return c.json<ApiResponse>({ success: false, message: "Failed to update file" }, 500);
	}

	return c.json<ApiResponse>({ success: true, message: "File updated successfully" });
});

// Delete a single file/folder
// TODO: implement delete multiple files/folders
filesRouter.delete("/", async (c: Context) => {
	const user = c.get("user");
	if (!user) {
		return c.json<ApiResponse>({ success: false, message: "User not authenticated" }, 401);
	}

	const account = await getAccount(user, c.req.raw.headers);
	if (!account) {
		return c.json<ApiResponse>({ success: false, message: "Unauthorized access" }, 401);
	}

	const { error, data } = deleteFileSchema.safeParse(c.req.query());
	if (error) {
		return c.json<ApiResponse>({ success: false, message: error.errors[0]?.message }, 400);
	}

	const accessToken = account.accessToken;
	if (!accessToken) {
		return c.json<ApiResponse>({ success: false, message: "Unauthorized access" }, 401);
	}

	try {
		// Delete all fileTag associations for the file
		// Has to be done manually since we don't store all files locally
		await tagService.deleteFileTagsByFileId(data.fileId, user.id);
	} catch {
		return c.json<ApiResponse>({ success: false, message: "Failed to delete file tag relationships." });
	}

	const fileId = data.fileId;
	const drive = await getDriveManagerForUser(user, c.req.raw.headers);
	const success = await drive.deleteFile(fileId);

	if (!success) {
		return c.json<ApiResponse>({ success: false, message: "Failed to delete file" }, 500);
	}

	return c.json<ApiResponse>({ success: true, message: "File deleted successfully" });
});

// Create file/folders
filesRouter.post("/", async (c: Context) => {
	const user = c.get("user");
	if (!user) {
		return c.json<ApiResponse>({ success: false, message: "User not authenticated" }, 401);
	}

	const account = await getAccount(user, c.req.raw.headers);
	if (!account) {
		return c.json<ApiResponse>({ success: false, message: "Unauthorized access" }, 401);
	}

	//Validation
	const { error, data } = createFileSchema.safeParse(c.req.query());
	if (error) {
		return c.json<ApiResponse>({ success: false, message: error.message }, 400);
	}

	const accessToken = account.accessToken;
	if (!accessToken) {
		return c.json<ApiResponse>({ success: false, message: "Unauthorized access" }, 401);
	}

	const name = data.name;
	const mimeType = data.mimeType;
	const parent = data.parent ? data.parent : undefined;

	const drive = await getDriveManagerForUser(user, c.req.raw.headers);
	const success = await drive.createFile(name, mimeType, parent);

	if (!success) {
		return c.json<ApiResponse>({ success: false, message: "Failed to create file" }, 500);
	}

	return c.json<ApiResponse>({ success: true, message: "File created successfully" });
});

export default filesRouter;
