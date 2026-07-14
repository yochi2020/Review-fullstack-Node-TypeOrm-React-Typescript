import type { User } from "@/entities/user.entity.js";
import type { NextFunction, Request, Response } from "express";

export const PermissionMiddleware = (name: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user: User = req.user;

    const permissions = user.role.permissions;

    if (req.method === "GET") {
      if (!permissions.some((p) => p.name === `view_${name}` || p.name === `edit_${name}`)) {
        return res.status(401).send({ message: "unauthorized" });
      }
    } else {
      if (!permissions.some((p) => p.name === `edit_${name}`)) {
        return res.status(401).send({ message: "unauthorized" });
      }
    }
    return next();
  };
};
