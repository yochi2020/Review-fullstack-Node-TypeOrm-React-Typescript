import type { NextFunction, Request, Response } from "express";
import { AppDataSource } from "@/configs/data-source.js";
import { User } from "@/entities/user.entity.js";
import jwt from "jsonwebtoken";
import { env } from "@configs/env.js";

export const AuthenticatedMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // เขียน logic ของ controller ที่นี่
    const jwt2 = req.cookies.jwt;
    const payload = jwt.verify(jwt2, env.SECRET_KEY);

    if (!payload) {
      return res.status(400).send({ message: "unauthenticated" });
    }
    if (typeof payload === "string") {
      return res.status(401).json({ message: "Invalid token" });
    }

    const repository = AppDataSource.getRepository(User);

    req.user = await repository.findOneBy({ id: payload.id });
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};
