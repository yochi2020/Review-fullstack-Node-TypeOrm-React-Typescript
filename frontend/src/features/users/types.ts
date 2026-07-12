import type { Role } from "../roles/types";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role?: Role;
};

export type UserFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  roleId: string;
};
