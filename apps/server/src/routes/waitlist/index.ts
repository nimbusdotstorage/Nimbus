import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { joinWaitlist, getWaitlistCount } from "@/apps/server/src/controllers";
import { emailSchema } from "src/validators";

const waitlistRouter = new Hono();

waitlistRouter.post("/join", zValidator("json", emailSchema), joinWaitlist);
waitlistRouter.get("/count", getWaitlistCount);

export default waitlistRouter;
