import { waitlist } from "@nimbus/db/schema";
import { NextResponse } from "next/server";
import { count } from "drizzle-orm";
import { db } from "@nimbus/db";

export async function GET() {
	try {
		const result = await db.select({ count: count() }).from(waitlist);
		const resultCount = result[0]!.count || 0;
		return NextResponse.json({ count: resultCount });
	} catch (error) {
		console.error("Error getting waitlist count:", error);
		return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
	}
}
