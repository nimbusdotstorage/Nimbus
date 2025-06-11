import { createEnv } from "@t3-oss/env-core";

export const clientEnv = createEnv({
	clientPrefix: "PUBLIC_",
	client: {},

	runtimeEnv: process.env,
});

// Feature of t3-oss/env-core
// Auto completion - developer experience
// type-safety
