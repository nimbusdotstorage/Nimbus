// ! THIS DB CONFIGURATION IS FOR THE NEXT.JS WAITLIST ROUTE ONLY. DELETE THIS FILE & FOLDER WHEN THE WAITLIST IS ON HONO

import { drizzle } from "drizzle-orm/node-postgres";
import { config } from "dotenv";
import { Pool } from "pg";
import path from "path";

// Load environment variables
config({ path: path.resolve(process.cwd(), "../../../../.env") });

const pool = new Pool({
	connectionString: process.env.DATABASE_URL!,
});

export const db = drizzle(pool);
