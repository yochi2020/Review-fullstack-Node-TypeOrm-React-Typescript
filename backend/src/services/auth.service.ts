import { env } from "@/configs/env.js";
import * as repository from "@repository/auth.repository.js";
import { RegisterValidation } from "@validations/auth.validation.js";
import type {
  LoginDto,
  RegisterUserDto,
  UpdateCurrentUserPasswordDto,
  UpdateCurrentUserProfileDto,
} from "@dto/auth.dto.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "@/util/error.js";

export const register = async (body: RegisterUserDto) => {
  const { error } = RegisterValidation.validate(body, { abortEarly: false });
  if (error) {
    throw new AppError(400, "email is wrong");
  }
  if (body.password !== body.password_confirm) {
    throw new AppError(400, "Password's not match");
  }
  const existing = await repository.findUserByEmail(body.email);

  if (existing) {
    throw new AppError(400, "Email already exists");
  }

  const hashed = await bcrypt.hash(body.password, 10);
  const role = await repository.findRoleByName("Admin");

  if (!role) {
    throw new AppError(400, "Role not found");
  }

  return await repository.createUser({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: hashed,
    isActive: true,
    role: {
      id: role.id,
    },
  });
};

export const login = async (body: LoginDto) => {
  const secret = env.SECRET_KEY;
  if (!secret) {
    throw new AppError(500, "SECRET_KEY is not defined");
  }

  const existing = await repository.findUserByEmail(body.email);

  if (!existing) {
    throw new AppError(401, "Email is wrong");
  }

  const passwordMatch = await bcrypt.compare(body.password, existing.password);
  if (!passwordMatch) {
    throw new AppError(401, "Password is wrong");
  }

  return jwt.sign(
    {
      id: existing.id,
    },
    secret,
    { expiresIn: "1d" },
  );
};

export const getCurrentUser = async (id: number) => {
  const result = await repository.findUserById(id);
  if (!result) {
    throw new Error("User not found");
  }
  const { password: _password, ...userWithoutPassword } = result;

  return userWithoutPassword;
};

export const updateCurrentUserProfile = async (id: number, body: UpdateCurrentUserProfileDto) => {
  const user = await repository.findUserById(id);
  if (!user) {
    throw new Error("User not found");
  }

  await repository.updateUserProfile(id, body);

  const updatedUser = await repository.findUserById(id);

  if (!updatedUser) {
    throw new AppError(404, "User not found");
  }

  const { password: _password, ...result } = updatedUser;

  return result;
};

export const updateCurrentUserPassword = async (id: number, body: UpdateCurrentUserPasswordDto) => {
  if (body.password !== body.password_confirm) {
    throw new AppError(404, "Password's do not match");
  }
  const hashedPassword = await bcrypt.hash(body.password, 10);

  await repository.updateUserPassword(id, hashedPassword);

  return { message: "Password updated successfully" };
};
