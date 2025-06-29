import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { extractTokenFromUrl } from "@/utils/extract-token";
import { genericOAuth } from "better-auth/plugins";
import { sendMail } from "@/utils/send-mail";
import { betterAuth } from "better-auth";
import schema from "@nimbus/db/schema";
import { db } from "@nimbus/db";

if (!process.env.FRONTEND_URL || !process.env.BACKEND_URL) {
	throw new Error("Missing environment variables. FRONTEND_URL or BACKEND_URL is not defined");
}

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: {
			...schema,
		},
	}),

	trustedOrigins: [process.env.FRONTEND_URL, process.env.BACKEND_URL],

	emailAndPassword: {
		enabled: true,
		autoSignIn: true,
		minPasswordLength: 8,
		maxPasswordLength: 100,
		resetPasswordTokenExpiresIn: 600, // 10 minutes
		sendResetPassword: async ({ user, url }) => {
			const token = extractTokenFromUrl(url);
			const frontendResetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

			await sendMail({
				to: user.email,
				subject: "Reset your password",
				text: `Click the link to reset your password: ${frontendResetUrl}`,
			});
		},
	},

	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			scope: [
				"https://www.googleapis.com/auth/drive",
				"https://www.googleapis.com/auth/userinfo.profile",
				"https://www.googleapis.com/auth/userinfo.email",
			],
			accessType: "offline",
			prompt: "consent",
		},
	},

	plugins: [
		genericOAuth({
			config: [
				{
					providerId: "box",
					clientId: process.env.BOX_CLIENT_ID as string,
					clientSecret: process.env.BOX_CLIENT_SECRET as string,
					authorizationUrl: "https://account.box.com/api/oauth2/authorize",
					tokenUrl: "https://api.box.com/oauth2/token",
					userInfoUrl: "https://api.box.com/2.0/users/me",
					scopes: ["root_readwrite"],
				},
			],
		}),
	],
});

export type Session = typeof auth.$Infer.Session;
