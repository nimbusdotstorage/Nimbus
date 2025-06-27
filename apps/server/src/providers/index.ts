import { GoogleDriveProvider } from "@/providers/google/google-drive";
// import { OneDriveProvider } from "@/providers/microsoft/one-drive";
import type { ProviderName } from "@/providers/interface/types";
import { getAccount } from "@/lib/utils/accounts";
import { type Session } from "@nimbus/auth/auth";
// import OneDrive from "@/lib/one-drive/src";

const createDriveManager = (providerName: ProviderName, accessToken: string) => {
	if (providerName === "google") {
		return new GoogleDriveProvider(accessToken);
	}
	if (providerName === "microsoft") {
		// return new OneDriveProvider(accessToken);
	}
	throw new Error("Unsupported provider");
};

export const getDriveManagerForUser = async (user: Session["user"] | null, headers: Headers) => {
	const account = await getAccount(user, headers);

	if (!account.accessToken || !account.providerId) {
		throw new Error("Missing account tokens");
	}

	return createDriveManager(account.providerId as ProviderName, account.accessToken);
};
