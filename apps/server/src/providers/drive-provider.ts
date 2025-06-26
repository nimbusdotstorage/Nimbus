import { GoogleDriveProvider } from "@/providers/google/google-drive";
import { OneDriveProvider } from "@/providers/onedrive/one-drive";
import type { ProviderName } from "@/providers/types";
import { getAccount } from "@/lib/utils/accounts";
import { type Session } from "@nimbus/auth/auth";

const providers = {
	google: GoogleDriveProvider,
	microsoft: OneDriveProvider,
};

export const createDriveManager = (provider: ProviderName, accessToken: string) => {
	const Provider = providers[provider];
	if (!Provider) throw new Error("Unsupported provider");

	return new Provider(accessToken);
};

export const getDriveManagerForUser = async (user: Session["user"] | null, headers: Headers) => {
	const account = await getAccount(user, headers);

	if (!account.accessToken || !account.providerId) {
		throw new Error("Missing account tokens");
	}

	return createDriveManager(account.providerId as ProviderName, account.accessToken);
};
