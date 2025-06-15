import type { Context, Next } from "hono";
import { auth } from "@nimbus/auth/auth";

const authMiddleware = async (c: Context, next: Next) => {
	try {
		const session = await auth.api.getSession({ headers: c.req.raw.headers });

		if (!session || !session.user) {
			throw new Error("Unauthorized");
		}

		c.set("user", session.user);
		c.set("session", session.session);
		return next();
	} catch (error) {
		console.error(error);
		c.json({ error: "Unauthorized" }, 401);
	}
};

export { authMiddleware };
