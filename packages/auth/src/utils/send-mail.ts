import path from "path";
import { config } from "dotenv";

config({ path: path.resolve(process.cwd(), "../../.env") });

export async function sendMail({ to, subject, text }: { to: string; subject: string; text: string }) {
	if (!process.env.BACKEND_URL) {
		throw new Error("BACKEND_URL is not set");
	}

	try {
		const response = await fetch(`${process.env.BACKEND_URL}/api/email/send-mail`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ to, subject, text }),
		});

		if (!response.ok) {
			throw new Error(`Failed to send email: ${response.statusText}`);
		}

		return await response.json();
	} catch (error) {
		console.error("Error sending email:", error);
		throw error;
	}
}
