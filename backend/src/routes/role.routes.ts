// src/routes/role.routes.ts
import { Router } from "express";
import {
  roles,
  createRole,
  getRole,
  updateRole,
  deleteRole,
} from "@controllers/role.controller.js";
import { AuthenticatedMiddleware } from "@middleware/auth.middleware.js";
import { PermissionMiddleware } from "@middleware/permission.middleware.js";

export const roleRouter = Router();

roleRouter.use(AuthenticatedMiddleware, PermissionMiddleware("roles"));

roleRouter.route("/").get(roles).post(createRole);

roleRouter.route("/:roleId").get(getRole).patch(updateRole).delete(deleteRole);
