import { checkEmail, handleAuth } from "@/controllers";
import { zValidator } from "@hono/zod-validator";
import { emailSchema } from "@/validators";
import { Hono } from "hono";

const authRouter = new Hono();

authRouter.post("/check-email", zValidator("json", emailSchema), ...checkEmail);

// Better Auth handler for all other auth routes
authRouter.on(["POST", "GET"], "/*", ...handleAuth);

export default authRouter;
