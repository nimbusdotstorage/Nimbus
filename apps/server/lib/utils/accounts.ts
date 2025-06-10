import { db } from "@/packages/db/src";
import { auth } from "@/packages/auth/src/auth";

export type SessionUser = {
	id: string;
	name: string;
	email: string;
	emailVerified: boolean;
	createdAt: Date;
	updatedAt: Date;
	image?: string | null;
};

export class AccountError extends Error {
	constructor(
		message: string,
		public code: string = "ACCOUNT_ERROR"
	) {
		super(message);
		this.name = "AccountError";
	}
}

export const getAccount = async (user: SessionUser, headers: Headers) => {
	if (!user?.id) {
		throw new AccountError("User session does not exist", "USER_SESSION_DOES_NOT_EXIST");
	}

	try {
		const account = await db.query.account.findFirst({
			where: (table, { eq }) => eq(table.userId, user.id),
		});

		if (!account) {
			throw new AccountError(`No account found`, "ACCOUNT_NOT_FOUND");
		}

		const { accessToken } = await auth.api.getAccessToken({
			body: {
				providerId: account.providerId,
				accountId: account.id,
				userId: account.userId,
			},
			headers,
		});

		return {
			...account,
			accessToken: accessToken ?? account.accessToken,
		};
	} catch (error) {
		if (error instanceof AccountError) {
			throw error;
		}
		throw new AccountError("Failed to retrieve account information", "ACCOUNT_RETRIEVAL_FAILED");
	}
};
