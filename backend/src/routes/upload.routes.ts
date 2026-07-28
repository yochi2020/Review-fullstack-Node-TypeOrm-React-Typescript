// src/routes/upload.routes.ts
import { Router } from "express";
import { upload } from "@controllers/upload.controller.js";
import { AuthenticatedMiddleware } from "@middleware/auth.middleware.js";

export const uploadRouter = Router();

uploadRouter.post("/", AuthenticatedMiddleware, upload);
