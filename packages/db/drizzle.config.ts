import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";
import path from "path";

// Load env variables from the root .env file
config({ path: path.resolve(process.cwd(), "../../.env") });

export default defineConfig({
	out: "./drizzle",
	schema: "./schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
});
