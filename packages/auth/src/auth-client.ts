import { createAuthClient } from "better-auth/react";
import { BACKEND_URL } from "./utils/constants";

export const authClient = createAuthClient({
	baseURL: BACKEND_URL,
});
