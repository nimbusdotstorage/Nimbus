import { z } from "zod";

export const sendMailSchema = z.object({
	to: z.string().email(),
	subject: z.string().min(1),
	text: z.string().min(1),
});

export const emailSchema = z.object({
	email: z.string().email("Invalid email format"),
});
