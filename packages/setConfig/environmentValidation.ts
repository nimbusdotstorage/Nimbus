import { z } from 'zod';

const urlSchema = z.string().url().min(1);
const nonEmptyString = (fieldName: string) =>
	z
    .string({
			required_error: `${fieldName} is required`,
			invalid_type_error: `${fieldName} must be a string`,
		})
		.min(1, `${fieldName} cannot be empty`);

const environmentSchema = z.object({
	// DB
	DATABASE_URL: nonEmptyString('Database URL').startsWith('postgres://', {
		message: 'Database URL must use PostgreSQL',
	}),

	// Google
	GOOGLE_CLIENT_ID: nonEmptyString('Google Client ID'),
	GOOGLE_CLIENT_SECRET: nonEmptyString('Google Client Secret'),

	// Better Auth
	BETTER_AUTH_SECRET: nonEmptyString('Better Auth Secret').min(
		32,
		'Auth secret must be at least 32 characters long. Run `openssl rand -base64 32` to generate a Better Auth secret',
	),
	BETTER_AUTH_URL: urlSchema.default('http://localhost:3000'),

	// Environment
	NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

	// Add more env variables when we need to
});

export const env = environmentSchema.parse(process.env);
