import { GoogleDriveProvider } from "@/providers/google/google-drive";
import { getAccount } from "@/lib/utils/accounts";
import type { ApiResponse } from "@/routes/types";
import type { Context } from "hono";
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

export default drivesRouter;
