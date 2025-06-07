import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { config } from "dotenv";
import path from "path";
import schema from "../schema";

// Load environment variables
config({ path: path.resolve(process.cwd(), "../../.env") });

const pool = new Pool({
	connectionString: process.env.DATABASE_URL!,
});

export const db: NodePgDatabase<typeof schema> = drizzle(pool, { schema });
