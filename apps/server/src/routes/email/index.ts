import { sendMail } from "@/apps/server/src/controllers/email";
import { sendMailSchema } from "@/apps/server/src/validators";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

const emailRouter = new Hono();

emailRouter.post("/send-mail", zValidator("json", sendMailSchema), sendMail);

export default emailRouter;
