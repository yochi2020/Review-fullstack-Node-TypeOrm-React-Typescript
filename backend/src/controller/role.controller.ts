import { AppDataSource } from "@/configs/data-source.js";
import { Role } from "@/entities/role.entity.js";
import type { Request, Response } from "express";
const repository = AppDataSource.getRepository(Role);
export const roles = async (req: Request, res: Response) => {
  // เขียน logic ของ controller ที่นี่

  res.json(await repository.find());
};

export const createRole = async (req: Request, res: Response) => {
  // เขียน logic ของ controller ที่นี่
  const { name, permission } = req.body;

  const role = AppDataSource.getRepository(Role);

  const tttt = await role.save({
    name,
    permissions: await permission.map((id: number) => ({ id })),
  });
  res.json(tttt);
};

export const getRole = async (req: Request, res: Response) => {
  const result = await repository.find({ where: req.params, relations: { permissions: true } });
  res.json(result);
};

export const updateRole = async (req: Request, res: Response) => {
  // เขียน logic ของ controller ที่นี่
  const { name, permission } = req.body;

  const role = await repository.findOne({
    where: req.params,
    relations: { permissions: true },
  });
  if (!role) {
    return res.status(404).json({ message: "Role not found" });
  }

  role.name = name;
  role.permissions = permission.map((id: number) => ({ id }));

  const result = await repository.save(role);
  // const role = await repository.findOne({
  //   where: { name },
  //   relations: { permissions: true },
  // });
  res.json(result);
};

export const deleteRole = async (req: Request<{ id: string }>, res: Response) => {
  // เขียน logic ของ controller ที่นี่
  const result = await repository.delete(req.params.id);
  res.json(result);
};
