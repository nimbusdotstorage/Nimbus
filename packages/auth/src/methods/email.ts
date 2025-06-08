import { authClient } from "../auth-client";
import { CALLBACK_URL } from "../utils/constants";

export const signInWithEmail = async (email: string, password: string, remember: boolean) => {
	await authClient.signIn.email({
		email,
		password,
		rememberMe: remember,
		callbackURL: CALLBACK_URL,
	});
};

export const signUpWithEmail = async (username: string, email: string, password: string) => {
	await authClient.signUp.email({
		name: username,
		email,
		password,
		callbackURL: CALLBACK_URL,
	});
};
