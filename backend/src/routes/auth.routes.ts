// src/routes/auth.routes.ts
import { Router } from "express";
import {
  register,
  login,
  logout,
  getCurrentUser,
  updateCurrentUserProfile,
  updateCurrentUserPassword,
} from "@controllers/auth.controller.js";
import { AuthenticatedMiddleware } from "@middleware/auth.middleware.js";

export const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);

authRouter.use(AuthenticatedMiddleware);

authRouter.post("/logout", logout);
authRouter.get("/me", getCurrentUser);
authRouter.patch("/me/profile", updateCurrentUserProfile);
authRouter.patch("/me/password", updateCurrentUserPassword);
