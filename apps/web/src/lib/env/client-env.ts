import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const clientEnv = createEnv({
	clientPrefix: "NEXT_PUBLIC_",
	client: {
		NEXT_PUBLIC_BACKEND_URL: z
			.string()
			.url("NEXT_PUBLIC_BACKEND_URL must be a valid URL (e.g., https://api.yourdomain.com).")
			.optional()
			.default("http://localhost:8000"),
		NEXT_PUBLIC_CALLBACK_URL: z
			.string()
			.url("NEXT_PUBLIC_CALLBACK_URL must be a valid URL (e.g., https://yourdomain.com).")
			.optional()
			.default("http://localhost:3000"),
		NEXT_PUBLIC_FRONTEND_URL: z
			.string()
			.url("NEXT_PUBLIC_FRONTEND_URL must be a valid URL (e.g., https://yourdomain.com)")
			.optional()
			.default("http://localhost:3000"),
	},
	runtimeEnv: {
		NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
		NEXT_PUBLIC_CALLBACK_URL: process.env.NEXT_PUBLIC_CALLBACK_URL,
		NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
	},
});
