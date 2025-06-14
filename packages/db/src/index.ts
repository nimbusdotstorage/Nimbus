import { drizzle } from "drizzle-orm/node-postgres";
import schema from "@nimbus/db/schema";
import { Pool } from "pg";

const pool = new Pool({
	connectionString: process.env.DATABASE_URL!,
});

export const db = drizzle({ client: pool, schema });
