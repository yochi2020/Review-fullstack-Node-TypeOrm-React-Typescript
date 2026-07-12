import { AppDataSource } from "@/configs/data-source.js";
import { Role } from "@/entities/role.entity.js";
import { User } from "@/entities/user.entity.js";
import type { CreateUserData, UpdateUserData, UpdateUserProfileData } from "@/types/auth.js";

const userRepository = AppDataSource.getRepository(User);
const roleRepository = AppDataSource.getRepository(Role);

export const createUser = async (data: CreateUserData) => {
  return userRepository.save(data);
};

export const findUserByEmail = async (email: string) => {
  return userRepository.findOneBy({ email });
};

export const findUserById = async (id: number) => {
  return userRepository.findOneBy({ id });
};

export const updateUserProfile = async (id: number, data: UpdateUserProfileData) => {
  return userRepository.update(id, data);
};

export const updateUserPassword = async (id: number, password: string) => {
  return userRepository.update(id, { password });
};

export const findActiveUsers = async () => {
  return userRepository.find({
    where: { isActive: true },
    relations: { role: true },
  });
};

export const deactivateUser = async (id: number) => {
  return userRepository.update(id, {
    isActive: false,
  });
};

export const findRoleByName = async (name: string): Promise<Role | null> => {
  return roleRepository.findOneBy({ name });
};

export const updateUserById = async (data: UpdateUserData) => {
  return userRepository.update(data.id, data);
};
