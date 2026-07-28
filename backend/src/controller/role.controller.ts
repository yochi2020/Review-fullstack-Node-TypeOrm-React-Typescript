import { AppDataSource } from "@/configs/data-source.js";
import { Role } from "@/entities/role.entity.js";
import type { Request, Response } from "express";
const repository = AppDataSource.getRepository(Role);
type RoleParams = { roleId: string };

const parseRoleId = (req: Request<RoleParams>, res: Response) => {
  const roleId = Number(req.params.roleId);

  if (!Number.isInteger(roleId) || roleId <= 0) {
    res.status(400).json({ message: "Invalid role id" });
    return null;
  }

  return roleId;
};

export const roles = async (_req: Request, res: Response) => {
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

export const getRole = async (req: Request<RoleParams>, res: Response) => {
  const roleId = parseRoleId(req, res);
  if (roleId === null) return;

  const result = await repository.findOne({
    where: { id: roleId },
    relations: { permissions: true },
  });

  if (!result) {
    return res.status(404).json({ message: "Role not found" });
  }

  res.json(result);
};

export const updateRole = async (req: Request<RoleParams>, res: Response) => {
  // เขียน logic ของ controller ที่นี่
  const { name, permission } = req.body;
  const roleId = parseRoleId(req, res);
  if (roleId === null) return;

  const role = await repository.findOne({
    where: { id: roleId },
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

export const deleteRole = async (req: Request<RoleParams>, res: Response) => {
  // เขียน logic ของ controller ที่นี่
  const roleId = parseRoleId(req, res);
  if (roleId === null) return;

  const result = await repository.delete(roleId);

  if (!result.affected) {
    return res.status(404).json({ message: "Role not found" });
  }

  res.json(result);
};
