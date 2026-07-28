import { apiClient } from "../../shared/api/client";
import type { Product, ProductPayload } from "./types";

export async function listProducts(): Promise<Product[]> {
  const { data } = await apiClient.get<{ result: Product[] }>("/products", {
    params: { page: 1 },
  });
  return data.result;
}

export async function getProduct(id: string): Promise<Product> {
  const { data } = await apiClient.get<Product>(`/products/${id}`);
  return data;
}

export function createProduct(payload: ProductPayload) {
  return apiClient.post("/products", payload);
}

export function updateProduct(id: string, payload: ProductPayload) {
  return apiClient.patch(`/products/${id}`, payload);
}

export function deleteProduct(id: number) {
  return apiClient.delete(`/products/${id}`);
}
