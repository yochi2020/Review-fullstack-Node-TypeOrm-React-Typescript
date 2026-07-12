import { AppDataSource } from "@/configs/data-source.js";
import { Permission } from "@/entities/permission.entity.js";
import type { Request, Response } from "express";

const repository = AppDataSource.getRepository(Permission);
export const permission = async (req: Request, res: Response) => {
  // เขียน logic ของ controller ที่นี่

  const permission = await repository.find();
  res.json(permission);
};
