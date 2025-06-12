// ! THIS DB CONFIGURATION IS FOR THE NEXT.JS WAITLIST ROUTE ONLY. DELETE THIS FILE & FOLDER WHEN THE WAITLIST IS ON HONO

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
	connectionString: process.env.DATABASE_URL!,
});

export const db = drizzle(pool);
