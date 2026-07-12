import { AppError } from "@/util/error.js";
import bcrypt from "bcryptjs";
import * as repository from "@repository/auth.repository.js";
import type { CreateUserData } from "@/types/auth.js";
import type { CreateUserDto, UpdateUserDto } from "@/dto/user.dto.js";

export const listUsers = async () => {
  const users = await repository.findActiveUsers();
  return users.map(({ password: _password, ...user }) => user);
};

export const createUser = async (body: CreateUserDto) => {
  const hashed = await bcrypt.hash(body.password, 10);
  const userData: CreateUserData = {
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: hashed,
    isActive: true,
    role: {
      id: body.roleId ?? 1,
    },
  };

  const { password: _password, ...result } = await repository.createUser(userData);
  return result;
};

export const getUserById = async (id: number) => {
  const result = await repository.findUserById(id);
  return result;
};

export const updateUserById = async (id: number, body: UpdateUserDto) => {
  const result = await repository.updateUserById({
    id,
    ...body,
  });
  return result;
};

export const deleteUserById = async (id: number) => {
  const user = await repository.findUserById(id);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (!user.isActive) {
    throw new AppError(400, "User already deleted");
  }

  await repository.deactivateUser(id);

  return { message: "User deleted successfully" };
};
