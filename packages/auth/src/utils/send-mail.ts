import { BACKEND_URL } from "./constants";
import axios from "axios";

export async function sendMail({ to, subject, text }: { to: string; subject: string; text: string }) {
	try {
		const response = await axios.post(`${BACKEND_URL}/api/email/send-mail`, { to, subject, text });

		return response.data;
	} catch (error) {
		console.error("Error sending email:", error);
		throw error;
	}
}
