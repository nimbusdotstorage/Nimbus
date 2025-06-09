import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		GOOGLE_CLIENT_ID: z.string().url(),
		GOOGLE_CLIENT_SECRET: z.string().min(1),
		FRONTEND_URL: z.string().url(),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
