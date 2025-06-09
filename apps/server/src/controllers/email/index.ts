import type { Context } from "hono";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const sendMail = async (c: Context) => {
	try {
		const { to, subject, text } = await c.req.json();

		if (!process.env.RESEND_API_KEY) {
			return c.json(
				{
					success: false,
					message: "RESEND_API_KEY environment variable is not set",
				},
				500
			);
		}

		if (!process.env.EMAIL_FROM) {
			return c.json(
				{
					success: false,
					message: "EMAIL_FROM environment variable is not set",
				},
				500
			);
		}

		const { data, error } = await resend.emails.send({
			from: process.env.EMAIL_FROM,
			to,
			subject,
			text,
		});

		if (error) {
			console.error("Error sending email:", error);
			return c.json(
				{
					success: false,
					message: "Failed to send email.",
					error,
				},
				500
			);
		}

		return c.json({
			success: true,
			messageId: data?.id,
		});
	} catch (err) {
		console.error("Unexpected error sending email:", err);
		return c.json(
			{
				success: false,
				message: "Unexpected error occurred.",
			},
			500
		);
	}
};
