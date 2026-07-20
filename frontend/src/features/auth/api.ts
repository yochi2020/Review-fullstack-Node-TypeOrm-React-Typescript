import { apiClient } from "../../shared/api/client";
import type {
  CurrentUser,
  LoginPayload,
  RegisterPayload,
  UpdatePasswordPayload,
  UpdateProfilePayload,
} from "./types";

export async function getCurrentUser(): Promise<CurrentUser> {
  const { data } = await apiClient.get<{ user: CurrentUser }>("/auth/me");
  return data.user;
}

export function login(payload: LoginPayload) {
  return apiClient.post("/auth/login", payload);
}

export function register(payload: RegisterPayload) {
  return apiClient.post("/auth/register", payload);
}

export function logout() {
  return apiClient.post("/auth/logout");
}

export async function updateCurrentUserProfile(
  payload: UpdateProfilePayload,
): Promise<CurrentUser> {
  const { data } = await apiClient.patch<CurrentUser>(
    "/auth/me/profile",
    payload,
  );
  return data;
}

export function updateCurrentUserPassword(payload: UpdatePasswordPayload) {
  return apiClient.patch<{ message: string }>("/auth/me/password", payload);
}
