import { clientEnv } from "@/lib/env/client-env";

export const siteConfig = {
	name: "Nimbus",
	description: "A better cloud storage solution.",
	url: clientEnv.NEXT_PUBLIC_FRONTEND_URL,
	twitterHandle: "@nimbusdotcloud",
} as const;
