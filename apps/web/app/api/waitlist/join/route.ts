import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/packages/db/src/index";
import { waitlist } from "@/packages/db/schema";
import { nanoid } from "nanoid";

// Email validation schema
const emailSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
});

// POST /api/waitlist/join - Add email to waitlist
export async function POST(request: Request) {
	try {
		const body = await request.json();
		const result = emailSchema.safeParse(body);

		if (!result.success) {
			return NextResponse.json({ success: false, error: result.error.format() }, { status: 400 });
		}

		const { email } = result.data;

		// Insert email into waitlist table
		await db
			.insert(waitlist)
			.values({
				id: nanoid(),
				email: email,
			})
			.onConflictDoNothing();

		return NextResponse.json({ success: true }, { status: 201 });
	} catch (error) {
		console.error("Error adding email to waitlist:", error);
		return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
	}
}
