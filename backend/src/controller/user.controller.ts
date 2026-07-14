import type { Request, Response } from "express";
import * as userService from "@/services/user.service.js";
import { AppDataSource } from "@/configs/data-source.js";
import { User } from "@/entities/user.entity.js";

export const listUsers = async (req: Request, res: Response) => {
  const repository = AppDataSource.getRepository(User);
  const page = parseInt(req.params.page as string);
  const limit = 10;
  const [result, total] = await repository.findAndCount({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      isActive: true,
      email: true,
    },
    skip: (page - 1) * limit,
    take: limit,
  });
  res.json({
    result,
    meta: {
      total,
      page,
      last_page: Math.ceil(total / page),
    },
  });
};

export const createUser = async (req: Request, res: Response) => {
  const result = await userService.createUser(req.body);
  res.json(result);
};

export const getUser = async (
  req: Request<{
    id: string;
  }>,
  res: Response,
) => {
  const result = await userService.getUserById(Number(req.params.id));
  res.json(result);
};

export const updateUser = async (req: Request<{ id: string }>, res: Response) => {
  const result = await userService.updateUserById(Number(req.params.id), req.body);
  res.json(result);
};

export const deleteUser = async (req: Request<{ id: string }>, res: Response) => {
  const result = await userService.deleteUserById(Number(req.params.id));
  res.json(result);
};
