import { createAuthClient } from "better-auth/react";
import { BASE_URL } from "./utils/constants";

export const authClient = createAuthClient({
	baseURL: BASE_URL,
});
