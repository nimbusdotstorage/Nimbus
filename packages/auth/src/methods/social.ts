import { authClient } from "../auth-client";
import { CALLBACK_URL } from "../utils/constants";

export const signInWithGoogle = async () => {
	await authClient.signIn.social({
		provider: "google",
		callbackURL: CALLBACK_URL,
	});
};
