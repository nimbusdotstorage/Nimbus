import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: process.env.NODE_ENV === "development" ? "http://localhost:1284" : "https://api.nimbus.storage",
});

export const signIn = async () => {
	await authClient.signIn.social({
		provider: "google",
		callbackURL: process.env.NODE_ENV === "development" ? "http://localhost:3000/app" : "https://nimbus.storage/app",
	});
};
