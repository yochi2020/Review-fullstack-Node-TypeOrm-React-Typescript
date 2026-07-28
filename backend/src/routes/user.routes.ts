// src/routes/user.routes.ts
import { Router } from "express";
import {
  listUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "@controllers/user.controller.js";
import { AuthenticatedMiddleware } from "@middleware/auth.middleware.js";
import { PermissionMiddleware } from "@middleware/permission.middleware.js";

export const userRouter = Router();

userRouter.use(AuthenticatedMiddleware, PermissionMiddleware("users"));

userRouter.route("/").get(listUsers).post(createUser);

userRouter.route("/:userId").get(getUser).patch(updateUser).delete(deleteUser);
