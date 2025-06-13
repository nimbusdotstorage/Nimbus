import { Factory } from "hono/factory";
import type { Context } from "hono";
import { env } from "@/config/env";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);
const factory = new Factory();

export const sendMail = factory.createHandlers(async (c: Context) => {
	try {
		const { to, subject, text } = await c.req.json();

		const { data, error } = await resend.emails.send({
			from: env.EMAIL_FROM,
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
});
