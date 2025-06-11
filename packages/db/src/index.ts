import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { config } from "dotenv";
import schema from "../schema";
import path from "path";

// Load environment variables
config({ path: path.resolve(process.cwd(), "../../.env") });

export const client = postgres(process.env.DATABASE_URL!, { prepare: false });

export const db = drizzle(client, { schema });
