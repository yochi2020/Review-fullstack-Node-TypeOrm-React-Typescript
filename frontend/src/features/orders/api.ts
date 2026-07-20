import { apiClient } from "../../shared/api/client";
import type { Order, OrderListResponse } from "./types";

export async function listOrders(page = 1): Promise<Order[]> {
  const { data } = await apiClient.get<OrderListResponse>("/orders", {
    params: { page },
  });
  return data.result;
}
