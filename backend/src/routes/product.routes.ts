// src/routes/product.routes.ts
import { Router } from "express";
import {
  listProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} from "@controllers/product.controller.js";
import { AuthenticatedMiddleware } from "@middleware/auth.middleware.js";
import { PermissionMiddleware } from "@middleware/permission.middleware.js";

export const productRouter = Router();

productRouter.use(AuthenticatedMiddleware, PermissionMiddleware("products"));

productRouter.route("/").get(listProducts).post(createProduct);

productRouter.route("/:productId").get(getProduct).patch(updateProduct).delete(deleteProduct);
