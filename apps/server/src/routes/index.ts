import waitlistRoutes from "./waitlist";
import filesRoutes from "./files";
import emailRoutes from "./email";
import authRoutes from "./auth";
import { Hono } from "hono";

const router = new Hono();

router.route("/files", filesRoutes);
router.route("/auth", authRoutes);
router.route("/waitlist", waitlistRoutes);
router.route("/email", emailRoutes);

export default router;
