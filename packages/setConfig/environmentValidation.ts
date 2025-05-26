import { z } from "zod";

const environmentSchema = z.object({
  DATABASE_URL: z
    .string({
      required_error: "Database URL IS REQUIRED",
      invalid_type_error: "Database URL is invalid",
    })
    .min(1, "Invalid string provided"),
  GOOGLE_CLIENT_ID: z
    .string({
      required_error: "GoogleClientID not found",
      invalid_type_error: "GoogleClientId is Invalid",
    })
    .min(1, "GoogleClientID cannot be so short "),
  GOOGLE_CLIENT_SECRET: z
    .string({
      required_error: "GOOGLE_CLIENT_SECRET not found",
      invalid_type_error: "GOOGLE_CLIENT_SECRET is Invalid",
    })
    .min(1, "GOOGLE_CLIENT_SECRET cannot be so short "),
});

export const env = environmentSchema.parse(process.env);
