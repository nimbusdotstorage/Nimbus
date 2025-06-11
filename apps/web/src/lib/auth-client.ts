import { createAuthClient } from "better-auth/react";
import { clientEnv } from "@/lib/env/client-env";

export const authClient = createAuthClient({
	baseURL: clientEnv.NEXT_PUBLIC_BACKEND_URL,
});
