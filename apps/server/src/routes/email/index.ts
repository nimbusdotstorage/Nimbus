import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { sendMail } from "@/apps/server/src/controllers";
import { sendMailSchema } from "src/validators";

const emailRouter = new Hono();

emailRouter.post("/send-mail", zValidator("json", sendMailSchema), sendMail);

export default emailRouter;
