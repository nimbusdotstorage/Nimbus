import { createAuthClient } from "better-auth/react";
import { clientEnv } from "./env/client-env";

export const authClient = createAuthClient({
	baseURL: clientEnv.NEXT_PUBLIC_BACKEND_URL,
});
