import { apiClient } from "../../shared/api/client";
import type { CurrentUser, LoginPayload, RegisterPayload } from "./types";

export async function getCurrentUser(): Promise<CurrentUser> {
  const { data } = await apiClient.get<CurrentUser>("/auth/me");
  return data;
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
