import { vercel } from "@t3-oss/env-core/presets-zod";
import { createEnv } from "@t3-oss/env-core";
import { clientEnv } from "./client-env";
import { z } from "zod";

export const serverEnv = createEnv({
	server: {
		DATABASE_URL: z
			.string({ message: "The DATABASE_URL environment variable must be set." })
			.url("The value provided for DATABASE_URL is not a valid URL. Please check the format."),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
	extends: [
		vercel(), // Currently client is hosted on vercel
		clientEnv, // Includes client-side env on server
	],
});
