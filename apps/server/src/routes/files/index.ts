import { createFile, deleteFile, getFiles, getFileById, updateFile } from "@/controllers";
import { Hono } from "hono";

const filesRouter = new Hono();

// Not sure why the :id works for getFileById, but not deleteFile route.
filesRouter.get("/", getFiles);
filesRouter.get("/:id", getFileById);
filesRouter.put("/:id/:name", updateFile);
filesRouter.delete("/", deleteFile);
filesRouter.post("/", createFile);

export default filesRouter;
