import { db } from "@/packages/db/src";
import { auth } from "@/packages/auth/src/auth";
import { eq } from "drizzle-orm";
import { account } from "@/packages/db/schema";

export type SessionUser = {
	id: string;
	name: string;
	email: string;
	emailVerified: boolean;
	createdAt: Date;
	updatedAt: Date;
	image?: string | null | undefined | undefined;
};

export const getActiveAccount = async (user: SessionUser, headers: Headers) => {
	if (!user?.id) {
		// Handle cases where user or userId is not available
		throw new Error("User session or user ID is missing.");
	}

	// Query the account table for an account matching the user.userId
	const activeAccount = await db.query.account.findFirst({
		where: eq(account.userId, user.id),
	});
	console.log(user.id);

	if (!activeAccount) {
		// If no account is found for the given userId, throw an error
		throw new Error(`No account found for user ID: ${user.id}`);
	}

	// If an account is found, proceed to get/refresh the access token
	// Assumes 'auth' is your authentication instance.
	console.log("Getting accessToken");
	console.log(activeAccount);
	console.log(activeAccount?.providerId);
	console.log(activeAccount?.accountId);
	console.log(activeAccount?.userId);
	const { accessToken } = await auth.api.getAccessToken({
		body: {
			providerId: activeAccount?.providerId,
			accountId: activeAccount?.accountId,
			userId: activeAccount?.userId,
		},
		headers,
	});

	console.log("Access token:", accessToken);
	// Return the account details along with the accessToken
	return {
		...activeAccount,
		accessToken: accessToken ?? activeAccount?.accessToken,
	};
};
