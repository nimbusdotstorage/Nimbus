import { z } from "zod";

export const sendMailSchema = z.object({
	to: z.string().email(),
	subject: z.string().min(1),
	text: z.string().min(1),
});

export const emailSchema = z.object({
	email: z.string().email("Invalid email format"),
});

export const getFileByIdSchema = z.object({
	id: z.string().min(1, "File ID cannot be empty").max(250, "File ID cannot be longer than 250 characters"),
});

export const deleteFileSchema = z.object({
	id: z.string().min(1, "File ID cannot be empty").max(250, "File ID cannot be longer than 250 characters"),
});

export const updateFileSchema = z.object({
	id: z.string().min(1, "File ID cannot be empty").max(250, "File ID cannot be longer than 250 characters"),
	name: z.string().min(1, "Name cannot be empty").max(100, "Name cannot be longer than 100 characters"),
});

export const createFileSchema = z.object({
	name: z.string().min(1, "Name cannot be empty").max(100, "Name cannot be longer than 100 characters"),
	mimeType: z.string().min(1, "MIME type cannot be empty").max(100, "MIME type cannot be longer than 100 characters"),
	parents: z.string().min(1, "Parent ID cannot be empty").optional(),
});
