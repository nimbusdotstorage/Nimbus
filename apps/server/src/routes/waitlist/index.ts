import { joinWaitlist, getWaitlistCount } from "@/controllers/waitlist";
import { zValidator } from "@hono/zod-validator";
import { emailSchema } from "@/validators";
import { Hono } from "hono";

const waitlistRouter = new Hono();

waitlistRouter.post("/join", zValidator("json", emailSchema), joinWaitlist);
waitlistRouter.get("/count", getWaitlistCount);

export default waitlistRouter;
