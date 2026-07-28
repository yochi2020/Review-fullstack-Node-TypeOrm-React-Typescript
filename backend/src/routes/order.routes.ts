// src/routes/order.routes.ts
import { Router } from "express";
import { listOrders } from "@controllers/order.controller.js";
import { AuthenticatedMiddleware } from "@middleware/auth.middleware.js";
import { PermissionMiddleware } from "@middleware/permission.middleware.js";

export const orderRouter = Router();

orderRouter.use(AuthenticatedMiddleware, PermissionMiddleware("orders"));

orderRouter.route("/").get(listOrders);
