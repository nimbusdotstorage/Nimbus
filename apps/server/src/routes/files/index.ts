import { Hono } from "hono";
import { getFiles, getFileById } from "@/apps/server/src/controllers";

const filesRouter = new Hono();

filesRouter.get("/", getFiles);
filesRouter.get("/:id", getFileById);

export default filesRouter;
