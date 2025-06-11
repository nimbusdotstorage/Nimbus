import { getFiles, getFileById } from "@/controllers";
import { Hono } from "hono";

const filesRouter = new Hono();

filesRouter.get("/", getFiles);
filesRouter.get("/:id", getFileById);

export default filesRouter;
