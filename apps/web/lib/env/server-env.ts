import { vercel } from "@t3-oss/env-core/presets-zod";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import { clientEnv } from "./client-env";

export const serverEnv = createEnv({
	server: {
		DATABASE_URL: z.string().url(),
		GOOGLE_CLIENT_ID: z.string(),
		GOOGLE_CLIENT_SECRET: z.string().min(1),
		BETTER_AUTH_SECRET: z.string().min(1),
		BETTER_AUTH_URL: z.string().url(),
		FRONTEND_URL: z.string().url(),
		BACKEND_URL: z.string().url(),
		NODE_ENV: z.enum(["development", "production"]),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
	extends: [
		vercel(), // Currently client is hosted on vercel
		clientEnv, // Includes client-side env on server
	],
});
