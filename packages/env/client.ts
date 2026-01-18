import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

const env = createEnv({
	runtimeEnv: import.meta.env,

	clientPrefix: "VITE_",
	client: {
		// Client-side environment variables
		VITE_BACKEND_URL: z.url(),
		VITE_FRONTEND_URL: z.url(),
		VITE_POSTHOG_KEY: z.string().optional(),
		VITE_POSTHOG_HOST: z.string().optional(),
	},
});

export default env;
