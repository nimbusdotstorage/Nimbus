import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: "http://localhost:3000",
});

export const signIn = async () => {
	const data = await authClient.signIn.social({
		provider: "google",
	});
};
