import { z } from "zod";

const ALLOWED_DOMAINS = ["gmail.com", "outlook.com", "yahoo.com", "proton.me"];

export const sendMailSchema = z.object({
	to: z.string().email(),
	subject: z.string().min(1),
	text: z.string().min(1),
});

export const emailSchema = z.object({
	email: z
		.string()
		.email("Please enter a valid email address")
		.refine(email => {
			const [, domain] = email.split("@");
			if (!domain) return false;

			const allowed = ALLOWED_DOMAINS.some(allowed => domain === allowed || domain.endsWith(`.${allowed}`));
			if (!allowed) return false;

			const labels = domain.split(".");
			if (labels.length < 2 || labels.length > 3) return false;
			const tld = labels.at(-1)!;
			return /^[a-z]{2,63}$/i.test(tld);
		}, "Invalid email, please try again"),
});
