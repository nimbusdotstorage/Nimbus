import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { db } from "@/packages/db/src";
import { waitlist } from "@/packages/db/schema";
import { count } from "drizzle-orm";
import { nanoid } from "nanoid";

const app = new Hono();

// Email validation schema with Zod
const emailSchema = z.object({
	email: z.string().email("Invalid email format"),
});

type EmailSchema = z.infer<typeof emailSchema>;

// Route to add email to waitlist
app.post("/join", zValidator("json", emailSchema), async c => {
	try {
		// Type-safe access to validated data using type assertion
		const data = c.req.valid("json") as EmailSchema;
		const { email } = data;

		// Insert email into waitlist table
		await db
			.insert(waitlist)
			.values({
				id: nanoid(),
				email: email,
			})
			.onConflictDoNothing();

		return c.json({ success: true }, 201);
	} catch (error) {
		console.error("Error adding email to waitlist:", error);
		return c.json(
			{
				success: false,
				message: "Failed to add email to waitlist",
			},
			500
		);
	}
});

// Route to get waitlist count
app.get("/count", async c => {
	try {
		const result: { count: number }[] = await db.select({ count: count() }).from(waitlist);
		return c.json({ count: result[0]?.count });
	} catch (error) {
		console.error("Error getting waitlist count:", error);
		return c.json(
			{
				success: false,
				message: "Failed to get waitlist count",
			},
			500
		);
	}
});

export default app;
