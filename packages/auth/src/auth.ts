import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/packages/db/src/index";
import schema from "@/packages/db/schema";
import { betterAuth } from "better-auth";
import { config } from "dotenv";
import path from "path";

// Load env variables from the root .env file
config({ path: path.resolve(process.cwd(), "../../.env") });

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: {
			...schema,
		},
	}),
	trustedOrigins: [process.env.FRONTEND_URL!, process.env.BACKEND_URL!],
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			scope: [
				"https://www.googleapis.com/auth/drive",
				"https://www.googleapis.com/auth/userinfo.profile",
				"https://www.googleapis.com/auth/userinfo.email",
			],
		},
	},
});
