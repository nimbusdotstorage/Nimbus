import { authClient } from "../auth-client";

export const signOut = async () => {
	await authClient.signOut();
};
