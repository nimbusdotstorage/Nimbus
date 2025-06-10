import { drizzle } from "drizzle-orm/node-postgres";
import schema from "@nimbus/db/schema";
import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
	throw new Error("Missing environment variables. DATABASE_URL is not defined");
}

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

export const db = drizzle({ client: pool, schema });
