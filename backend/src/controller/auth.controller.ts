import type { Request, Response } from "express";
import * as authService from "@/services/auth.service.js";

export const register = async (req: Request, res: Response) => {
  const user = await authService.register(req.body);
  res.json(user);
};

export const login = async (req: Request, res: Response) => {
  const token = await authService.login(req.body);
  res
    .cookie("jwt", token, {
      httpOnly: true,
      maxAge: 24 * 68 * 60 * 1000,
    })
    .json({ message: token });
};

export const getCurrentUser = async (req: Request, res: Response) => {
  const user = await authService.getCurrentUser(req.user.id);
  res.json(user);
};

export const logout = async (_req: Request, res: Response) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.json({ message: "Logout Success" });
};

export const updateCurrentUserProfile = async (req: Request, res: Response) => {
  const result = await authService.updateCurrentUserProfile(req.user.id, req.body);
  res.json(result);
};

export const updateCurrentUserPassword = async (req: Request, res: Response) => {
  const result = await authService.updateCurrentUserPassword(req.user.id, req.body);
  res.json(result);
};
