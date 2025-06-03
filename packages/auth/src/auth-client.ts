import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: process.env.NODE_ENV === "development" ? "http://localhost:1284" : "https://api.nimbus.storage",
});

export const signInGoogle = async () => {
	await authClient.signIn.social({
		provider: "google",
		callbackURL: process.env.NODE_ENV === "development" ? "http://localhost:3000/app" : "https://nimbus.storage/app",
	});
};

export const signInPassword = async (email: string, password: string, remember: boolean) => {
	await authClient.signIn.email({
    email: email,
    password: password,
    rememberMe: remember,
    callbackURL: process.env.NODE_ENV === "development" ? "http://localhost:3000/app" : "https://nimbus.storage/app",
 });
};

export const signUpPassword = async (username: string, email: string, password: string) => {
	await authClient.signUp.email({
    name: username,
    email: email,
    password: password,
    callbackURL: process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://nimbus.storage",
  });
};

export const signOut = async () => {
	await authClient.signOut();
};