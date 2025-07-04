import { GoogleDriveProvider } from "@/providers/google/google-drive";
import { getAccount } from "@/lib/utils/accounts";
import type { ApiResponse } from "@/routes/types";
import { pinnedFolder } from "@nimbus/db/schema";
import { eq, and } from "drizzle-orm";
import type { Context } from "hono";
import { db } from "@nimbus/db";
import { Hono } from "hono";

const drivesRouter = new Hono();

// Get drive storage info
drivesRouter.get("/about", async (c: Context) => {
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

	// * The GoogleDriveProvider will be replaced by a general provider in the future
	const drive = await new GoogleDriveProvider(accessToken).getDriveUsageLimit();
	if (!drive) {
		return c.json<ApiResponse>({ success: false, message: "Drive data not found" }, 404);
	}

	return c.json(drive);
});

// List all pinned folders
drivesRouter.get("/pinned", async (c: Context) => {
	const user = c.get("user");
	if (!user) {
		return c.json<ApiResponse>({ success: false, message: "User not authenticated" }, 401);
	}
	const folders = await db.select().from(pinnedFolder).where(eq(pinnedFolder.userId, user.id));
	return c.json<ApiResponse>({ success: true, message: JSON.stringify(folders) });
});

// Pin a folder
drivesRouter.post("/pinned", async (c: Context) => {
	const user = c.get("user");
	if (!user) {
		return c.json<ApiResponse>({ success: false, message: "User not authenticated" }, 401);
	}
	const body = await c.req.json();
	const { folderId, name, provider } = body;
	if (!folderId || !name || !provider) {
		return c.json<ApiResponse>({ success: false, message: "Missing required fields" }, 400);
	}

	const existing = await db
		.select()
		.from(pinnedFolder)
		.where(and(eq(pinnedFolder.userId, user.id), eq(pinnedFolder.folderId, folderId)));
	if (existing.length > 0) {
		return c.json<ApiResponse>({ success: false, message: "Folder already pinned" }, 409);
	}
	const id = crypto.randomUUID();
	await db.insert(pinnedFolder).values({
		id,
		userId: user.id,
		folderId,
		name,
		provider,
		createdAt: new Date(),
		updatedAt: new Date(),
	});
	return c.json<ApiResponse>({ success: true, message: id });
});

// Unpin a folder
drivesRouter.delete("/pinned/:id", async (c: Context) => {
	const user = c.get("user");
	if (!user) {
		return c.json<ApiResponse>({ success: false, message: "User not authenticated" }, 401);
	}
	const id = c.req.param("id");
	if (!id) {
		return c.json<ApiResponse>({ success: false, message: "Missing pinned folder id" }, 400);
	}

	const result = await db.delete(pinnedFolder).where(and(eq(pinnedFolder.id, id), eq(pinnedFolder.userId, user.id)));
	if (result.rowCount === 0) {
		return c.json<ApiResponse>({ success: false, message: "Pinned folder not found" }, 404);
	}
	return c.json<ApiResponse>({ success: true, message: "Pinned folder deleted" });
});

export default drivesRouter;
