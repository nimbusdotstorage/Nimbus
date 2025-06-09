import { waitlist } from "@repo/db/schema";
import { count } from "drizzle-orm";
import type { Context } from "hono";
import { nanoid } from "nanoid";
import { db } from "@repo/db";

export const joinWaitlist = async (c: Context) => {
	try {
		const { email } = await c.req.json();

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
};

export const getWaitlistCount = async (c: Context) => {
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
};
