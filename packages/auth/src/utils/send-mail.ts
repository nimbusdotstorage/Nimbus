import { BACKEND_URL } from "./constants";

export async function sendMail({ to, subject, text }: { to: string; subject: string; text: string }) {
	try {
		const response = await fetch(`${BACKEND_URL}/api/email/send-mail`, {
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
