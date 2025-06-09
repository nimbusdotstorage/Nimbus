import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/packages/db/src/index";
import { config } from "dotenv";
import path from "path";
import schema from "@/packages/db/schema";
import { sendMail } from "./utils/send-mail";
import { extractTokenFromUrl } from "./utils/extract-token";

// Load env variables from the root .env file
config({ path: path.resolve(process.cwd(), "../../.env") });

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: {
			...schema,
		},
	}),

	trustedOrigins: [process.env.FRONTEND_URL!, process.env.BACKEND_URL!],

	emailAndPassword: {
		enabled: true,
		autoSignIn: true,
		minPasswordLength: 8,
		maxPasswordLength: 128,
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
		},
	},
});
