import { Hono } from "hono";
import { auth } from "@/packages/auth/src/auth";
import { cors } from "hono/cors";
import { GoogleDriveManager } from "lib/google-drive";

const app = new Hono();

app.use(cors());

app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

app.get("/", (c) =>
  c.text("Nimbus is flying! The server is running on port 7777")
);

app.get("/api/gd/get-credentials", async (c) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session) {
    return c.text("Unauthorized", 401);
  }

  try {
    const driveManager = new GoogleDriveManager({
      auth: {
        refreshToken: session.session.token,
      },
    });

    const credentials = driveManager.listFiles({
      folderId: "1n5PvwYC-LfsEdUmunwH2CC1nnMe7XCmP",
    });

    return c.json(credentials);
  } catch (error) {
    console.error(error);
    return c.text("Error retrieving credentials: " + error, 500);
  }
});

export default {
  port: 7777,
  fetch: app.fetch,
};
