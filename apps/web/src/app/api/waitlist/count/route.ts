import { NextResponse } from "next/server";
import { db } from "@nimbus/db";

export async function GET() {
	try {
		const result = await db.query.waitlist.findMany({
			columns: { id: true },
		});
		return NextResponse.json({ count: result.length });
	} catch (error) {
		console.error("Error getting waitlist count:", error);
		return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
	}
}
