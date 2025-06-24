import { GoogleDriveProvider } from "@/providers/google/google-drive";
import { OneDriveProvider } from "@/providers/onedrive/one-drive";
import type { ProviderName } from "@/providers/types";

const providers = {
	google: GoogleDriveProvider,
	microsoft: OneDriveProvider,
};

export const createDriveManager = (provider: ProviderName, accessToken: string) => {
	const Provider = providers[provider];
	if (!Provider) throw new Error("Unsupported provider");

	return new Provider(accessToken);
};
