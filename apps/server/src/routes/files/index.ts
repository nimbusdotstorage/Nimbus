import { Hono } from "hono";
import type { ReqVariables } from "@/apps/server/src/index";
import { getAccount } from "lib/utils/accounts";
import { GoogleDriveProvider } from "@/providers/google/google-drive";
import type { File } from "@/providers/google/types";

type DeleteFileResponse = {
	success: boolean;
	message?: string;
};

// Cache control constants
const CACHE_MAX_AGE = 60 * 5; // 5 minutes in seconds
const STALE_WHILE_REVALIDATE = 60 * 60 * 24; // 1 day in seconds
const CACHE_HEADER = `public, max-age=${CACHE_MAX_AGE}, s-maxage=${CACHE_MAX_AGE}, stale-while-revalidate=${STALE_WHILE_REVALIDATE}`;

const app = new Hono<{ Variables: ReqVariables }>();

// Get all files from Google Drive
app.get("/", async c => {
	const user = c.get("user");
	if (!user) {
		return c.json({ error: "User not authenticated" }, 401);
	}
	const account = await getAccount(user, c.req.raw.headers);
	if (!account) {
		return c.json({ error: "Unauthorized access" }, 401);
	}

	const files = await new GoogleDriveProvider(account.accessToken!).listFiles();
	if (!files) {
		return c.json({ error: "Files not found" }, 404);
	}

	// Set cache headers for the list of files
	c.header("Cache-Control", CACHE_HEADER);
	c.header("Vary", "Authorization"); // Vary cache by Authorization header
	return c.json(files as File[]);
});

// Get a specific file from Google Drive via ID in url params
app.get("/:id", async c => {
	const user = c.get("user");
	if (!user) {
		return c.json({ error: "User not authenticated" }, 401);
	}

	const account = await getAccount(user, c.req.raw.headers);
	if (!account) {
		return c.json({ error: "Unauthorized access" }, 401);
	}

	const file = await new GoogleDriveProvider(account.accessToken!).getFileById(c.req.param().id);
	if (!file) {
		return c.json({ error: "File not found" }, 404);
	}
	return c.json<File>(file);
});

// Delete a file from Google Drive
app.delete("/:id", async c => {
	const user = c.get("user");
	if (!user) {
		return c.json<DeleteFileResponse>({ success: false, message: "User not authenticated" }, 401);
	}

	const account = await getAccount(user, c.req.raw.headers);
	if (!account) {
		return c.json<DeleteFileResponse>({ success: false, message: "Unauthorized access" }, 401);
	}

	const fileId = c.req.param("id");
	const success = await new GoogleDriveProvider(account.accessToken!).deleteFile(fileId);

	if (!success) {
		return c.json<DeleteFileResponse>({ success: false, message: "Failed to delete file" }, 500);
	}

	return c.json<DeleteFileResponse>({ success: true, message: "File deleted successfully" });
});

export default app;
