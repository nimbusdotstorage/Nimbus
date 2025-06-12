import { drizzle } from "drizzle-orm/postgres-js";
import schema from "@nimbus/db/schema";
import postgres from "postgres";

export const client = postgres(process.env.DATABASE_URL!, { prepare: false });

export const db = drizzle(client, { schema });
