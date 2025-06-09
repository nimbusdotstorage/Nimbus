import filesRoutes from "./files";
import authRoutes from "./auth";
import waitlistRoutes from "./waitlist";
import emailRoutes from "./email";
import { Hono } from "hono";

const router = new Hono();

router.route("/files", filesRoutes);
router.route("/auth", authRoutes);
router.route("/waitlist", waitlistRoutes);
router.route("/email", emailRoutes);

export default router;
