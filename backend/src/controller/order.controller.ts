import { AppDataSource } from "@/configs/data-source.js";
import { Order } from "@/entities/order.entity.js";
import type { Request, Response } from "express";
const repository = AppDataSource.getRepository(Order);

export const listOrders = async (req: Request, res: Response) => {
  const requestedPage = Number.parseInt(String(req.query.page ?? "1"), 10);
  const page = Number.isNaN(requestedPage) ? 1 : Math.max(1, requestedPage);
  const limit = 10;
  const [result, total] = await repository.findAndCount({
    skip: (page - 1) * limit,
    take: limit,
    relations: {
      order_item: true,
    },
  });
  res.json({
    result: result.map((order: Order) => ({
      id: order.id,
      name: order.name,
      email: order.email,
      total: order.total,
      created_at: order.created_at,
      order_items: order.order_item,
    })),
    meta: {
      total,
      page,
      last_page: Math.ceil(total / limit),
    },
  });
};
