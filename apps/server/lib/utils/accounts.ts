import { createDriveManager } from "@/providers/drive-provider";
import { auth, type Session } from "@nimbus/auth/auth";
import type { ProviderName } from "@/providers/types";
import { db } from "@nimbus/db";

export class AccountError extends Error {
	constructor(
		message: string,
		public code: string = "ACCOUNT_ERROR"
	) {
		super(message);
		this.name = "AccountError";
	}
}

export const getAccount = async (user: typeof auth.$Infer.Session.user | null, headers: Headers) => {
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

export const getDriveManagerForUser = async (user: Session["user"] | null, headers: Headers) => {
	const account = await getAccount(user, headers);

	if (!account.accessToken || !account.providerId) {
		throw new Error("Missing account tokens");
	}

	return createDriveManager(account.providerId as ProviderName, account.accessToken);
};
