import { checkEmail, handleAuth } from "@/apps/server/src/controllers";
import { emailSchema } from "@/apps/server/src/validators";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

const authRouter = new Hono();

authRouter.post("/check-email", zValidator("json", emailSchema), checkEmail);

// Better Auth handler for all other auth routes
authRouter.on(["POST", "GET"], "/*", handleAuth);

export default authRouter;
