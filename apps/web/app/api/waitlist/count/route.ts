import { waitlist } from "@repo/db/schema";
import { NextResponse } from "next/server";
import { count } from "drizzle-orm";
import { db } from "@repo/db";

export async function GET() {
	try {
		const result = await db.select({ count: count() }).from(waitlist);
		return NextResponse.json({ count: result[0]?.count || 0 });
	} catch (error) {
		console.error("Error getting waitlist count:", error);
		return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
	}
}
