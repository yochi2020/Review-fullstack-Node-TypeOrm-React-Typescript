import type { NextFunction, Request, Response } from "express";
import { AppDataSource } from "@/configs/data-source.js";
import { User } from "@/entities/user.entity.js";
import jwt from "jsonwebtoken";
import { env } from "@configs/env.js";

export const AuthenticatedMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthenticated" });
    }

    const payload = jwt.verify(token, env.SECRET_KEY);

    if (typeof payload === "string") {
      return res.status(401).json({ message: "Invalid token" });
    }

    const repository = AppDataSource.getRepository(User);

    const user = await repository.findOne({
      where: { id: payload.id },
      relations: { role: { permissions: true } },
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    return next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    return next(error);
  }
};
