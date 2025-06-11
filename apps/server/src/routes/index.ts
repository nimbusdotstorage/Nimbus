import waitlistRoutes from "@/routes/waitlist";
import filesRoutes from "@/routes/files";
import emailRoutes from "@/routes/email";
import authRoutes from "@/routes/auth";
import { Hono } from "hono";

const router = new Hono();

router.route("/files", filesRoutes);
router.route("/auth", authRoutes);
router.route("/waitlist", waitlistRoutes);
router.route("/email", emailRoutes);

export default router;
