import { Hono } from "hono";
import type { ReqVariables } from "@/apps/server/src/index";
import { getActiveAccount } from "lib/utils/accounts";

const app = new Hono<{ Variables: ReqVariables }>();

// Sample data for testing
const sampleData = [
	{ id: "1", name: "Documents", type: "folder", modified: "May 15, 2024" },
	{ id: "2", name: "Images", type: "folder", modified: "May 12, 2024" },
	{ id: "3", name: "Project Proposal", type: "document", size: "2.4 MB", modified: "May 10, 2024" },
	{ id: "4", name: "Quarterly Report", type: "document", size: "4.2 MB", modified: "May 8, 2024" },
	{ id: "5", name: "Meeting Notes", type: "document", size: "1.1 MB", modified: "May 5, 2024" },
	{ id: "6", name: "Videos", type: "folder", modified: "May 3, 2024" },
];

// Existing sample data endpoints
app.get("/", async c => {
	// const type = c.req.query("type")?.toLowerCase() || "";
	// const filteredData = sampleData.filter(item => !type || item.type.toLowerCase().includes(type));
	// return c.json(filteredData);
	const user = c.get("user");
	console.log(user);
	if (!user) {
		return c.json({ error: "User not authenticated" }, 401);
	}
	const accessToken = await getActiveAccount(user, c.req.raw.headers);
	return c.text(JSON.stringify(accessToken));
	// Need to set context with db and auth data for access token
});

app.get("/:id", c => {
	const { id } = c.req.param();
	const file = sampleData.find(item => item.id === id);

	if (!file) {
		return c.json({ message: "File not found" }, 404);
	}

	return c.json(file);
});

export default app;
