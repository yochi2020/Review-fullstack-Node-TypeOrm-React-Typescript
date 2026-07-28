import { apiClient } from "../../shared/api/client";
import type { User } from "./types";

export async function listUsers(): Promise<User[]> {
  const { data } = await apiClient.get<{ result: User[] }>("/user", {
    params: { page: 1 },
  });
  return data.result;
}

export async function getUser(id: string): Promise<User> {
  const { data } = await apiClient.get<User>(`/user/${id}`);
  return data;
}

export function createUser(payload: object) {
  return apiClient.post("/user", payload);
}

export function updateUser(id: string, payload: object) {
  return apiClient.patch(`/user/${id}`, payload);
}

export function deleteUser(id: number) {
  return apiClient.delete(`/user/${id}`);
}
