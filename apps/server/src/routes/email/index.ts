import { zValidator } from "@hono/zod-validator";
import { sendMail } from "@/controllers/email";
import { sendMailSchema } from "@/validators";
import { Hono } from "hono";

const emailRouter = new Hono();

emailRouter.post("/send-mail", zValidator("json", sendMailSchema), ...sendMail);

export default emailRouter;
