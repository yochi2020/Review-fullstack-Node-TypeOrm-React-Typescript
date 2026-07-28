import type { Role } from "../roles/types";

export type CurrentUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role?: Role;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = LoginPayload & {
  firstName: string;
  lastName: string;
  password_confirm: string;
};

export type UpdateProfilePayload = Pick<
  CurrentUser,
  "firstName" | "lastName" | "email"
>;

export type UpdatePasswordPayload = {
  password: string;
  password_confirm: string;
};
