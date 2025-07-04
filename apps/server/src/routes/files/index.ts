import { createFileSchema, deleteFileSchema, getFileByIdSchema, updateFileSchema } from "@/validators";
import { GoogleDriveProvider } from "@/providers/google/google-drive";
import { TagService } from "@/routes/tags/tag-service";
import type { File } from "@/providers/google/types";
import { getAccount } from "@/lib/utils/accounts";
import type { ApiResponse } from "@/routes/types";
import type { Context } from "hono";
import { Hono } from "hono";

// Cache control constants, replace with Valkey/Upstash/Redis?
// const CACHE_MAX_AGE = 60 * 5; // 5 minutes in seconds
// const STALE_WHILE_REVALIDATE = 60 * 60 * 24; // 1 day in seconds
// const CACHE_HEADER = `public, max-age=${CACHE_MAX_AGE}, s-maxage=${CACHE_MAX_AGE}, stale-while-revalidate=${STALE_WHILE_REVALIDATE}`;

const filesRouter = new Hono();
const tagService = new TagService();

// Get all files
filesRouter.get("/", async (c: Context) => {
	try {
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

		const parentId = c.req.query("parentId");

		// * The GoogleDriveProvider will be replaced by a general provider in the future
		const files = await new GoogleDriveProvider(accessToken).listFiles(parentId);
		if (!files) {
			return c.json<ApiResponse>({ success: false, message: "Files not found" }, 404);
		}

		// Add tags to files
		const filesWithTags = await Promise.all(
			files.map(async file => {
				const tags = await tagService.getFileTags(file.id!, user.id);
				return { ...file, tags };
			})
		);

		// Set cache headers for the list of files
		// c.header("Cache-Control", CACHE_HEADER);
		// c.header("Vary", "Authorization"); // Vary cache by Authorization header
		return c.json(filesWithTags as File[]);
	} catch (err: any) {
		// Always return JSON for errors
		return c.json<ApiResponse>({ success: false, message: err?.message || "Internal Server Error" }, 500);
	}
});

// Get a specific file from
filesRouter.get("/:id", async (c: Context) => {
	const user = c.get("user");
	if (!user) {
		return c.json<ApiResponse>({ success: false, message: "User not authenticated" }, 401);
	}

	const account = await getAccount(user, c.req.raw.headers);
	if (!account) {
		return c.json<ApiResponse>({ success: false, message: "Unauthorized access" }, 401);
	}

	// Validation
	const { error, data } = getFileByIdSchema.safeParse(c.req.param());
	if (error) {
		return c.json<ApiResponse>({ success: false, message: error.errors[0]?.message }, 400);
	}

	const fileId = data.id;
	if (!fileId) {
		return c.json<ApiResponse>({ success: false, message: "File ID not provided" }, 400);
	}

	const accessToken = account.accessToken;
	if (!accessToken) {
		return c.json<ApiResponse>({ success: false, message: "Unauthorized access" }, 401);
	}

	const file = await new GoogleDriveProvider(accessToken).getFileById(fileId);
	if (!file) {
		return c.json<ApiResponse>({ success: false, message: "File not found" }, 404);
	}

	// Add tags to file
	const tags = await tagService.getFileTags(fileId, user.id);
	const fileWithTags = { ...file, tags };

	// c.header("Cache-Control", CACHE_HEADER);
	// c.header("Vary", "Authorization"); // Vary cache by Authorization header
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

	const fileId = data.id;
	const name = data.name;

	const accessToken = account.accessToken;
	if (!accessToken) {
		return c.json<ApiResponse>({ success: false, message: "Unauthorized access" }, 401);
	}

	const success = await new GoogleDriveProvider(accessToken).updateFile(fileId, name);

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
		await tagService.deleteFileTagsByFileId(data.id, user.id);
	} catch {
		return c.json<ApiResponse>({ success: false, message: "Failed to delete file tag relationships." });
	}

	const fileId = data.id;
	const success = await new GoogleDriveProvider(accessToken).deleteFile(fileId);

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
		return c.json<ApiResponse>({ success: false, message: error.errors[0]?.message }, 400);
	}

	const accessToken = account.accessToken;
	if (!accessToken) {
		return c.json<ApiResponse>({ success: false, message: "Unauthorized access" }, 401);
	}

	const name = data.name;
	const mimeType = data.mimeType;
	const parents = data.parents ? [data.parents] : undefined;
	const success = await new GoogleDriveProvider(accessToken).createFile(name, mimeType, parents);

	if (!success) {
		return c.json<ApiResponse>({ success: false, message: "Failed to create file" }, 500);
	}

	return c.json<ApiResponse>({ success: true, message: "File created successfully" });
});

export default filesRouter;
