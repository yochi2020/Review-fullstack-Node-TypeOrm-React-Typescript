import { apiClient } from "../../shared/api/client";
import type { User } from "./types";

export async function listUsers(): Promise<User[]> {
  const { data } = await apiClient.get<User[]>("/users");
  return data;
}

export async function getUser(id: string): Promise<User> {
  const { data } = await apiClient.get<User>(`/users/${id}`);
  return data;
}

export function createUser(payload: object) {
  return apiClient.post("/users", payload);
}

export function updateUser(id: string, payload: object) {
  return apiClient.put(`/users/${id}`, payload);
}

export function deleteUser(id: number) {
  return apiClient.delete(`/users/${id}`);
}
