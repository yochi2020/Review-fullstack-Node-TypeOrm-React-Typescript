import { apiClient } from "../../shared/api/client";
import type { Permission, Role, RolePayload } from "./types";

export async function listRoles(): Promise<Role[]> {
  const { data } = await apiClient.get<Role[]>("/roles");
  return data;
}

export async function getRole(id: string): Promise<Role | undefined> {
  const { data } = await apiClient.get<Role | Role[]>(`/roles/${id}`);
  return Array.isArray(data) ? data[0] : data;
}

export async function listPermissions(): Promise<Permission[]> {
  const { data } = await apiClient.get<Permission[]>("/permissions");
  return data;
}

export function createRole(payload: RolePayload) {
  return apiClient.post("/roles", payload);
}

export function updateRole(id: string, payload: RolePayload) {
  return apiClient.put(`/roles/${id}`, payload);
}

export function deleteRole(id: number) {
  return apiClient.delete(`/roles/${id}`);
}
