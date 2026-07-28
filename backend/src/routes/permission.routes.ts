// src/routes/permission.routes.ts
import { Router } from "express";
import { listPermission } from "@controllers/permission.controller.js";
import { AuthenticatedMiddleware } from "@middleware/auth.middleware.js";
import { PermissionMiddleware } from "@middleware/permission.middleware.js";

export const permissionRouter = Router();

permissionRouter.get(
  "/",
  AuthenticatedMiddleware,
  PermissionMiddleware("permissions"),
  listPermission,
);
