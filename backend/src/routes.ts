import express, { Router } from "express";
import {
  register,
  login,
  logout,
  getCurrentUser,
  updateCurrentUserProfile,
  updateCurrentUserPassword,
} from "@controllers/auth.controller.js";
import { controllerTest } from "./controller/test.controller.js";
import { AuthenticatedMiddleware } from "./middleware/auth.middleware.js";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
  listUsers,
} from "./controller/user.controller.js";
import { permission } from "./controller/permission.controller.js";
import {
  createRole,
  deleteRole,
  getRole,
  roles,
  updateRole,
} from "./controller/role.controller.js";
import {
  createProduct,
  deleteProduct,
  getProduct,
  listProducts,
  updateProduct,
} from "./controller/product.controller.js";
import { upload } from "./controller/upload.controller.js";
import { order } from "./controller/order.controller.js";
import { PermissionMiddleware } from "./middleware/permission.middleware.js";

export const router = (router: Router) => {
  router.get("/test", controllerTest);

  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.post("/auth/logout", AuthenticatedMiddleware, logout);
  router.get("/auth/me", AuthenticatedMiddleware, getCurrentUser);
  router.patch("/auth/me/profile", AuthenticatedMiddleware, updateCurrentUserProfile);
  router.patch("/auth/me/password", AuthenticatedMiddleware, updateCurrentUserPassword);

  router.get("/users/:page", AuthenticatedMiddleware, PermissionMiddleware("users"), listUsers);
  router.post("/users", AuthenticatedMiddleware, PermissionMiddleware("users"), createUser);
  router.get("/users/id/:id", AuthenticatedMiddleware, PermissionMiddleware("users"), getUser);
  router.put("/users/:id", AuthenticatedMiddleware, PermissionMiddleware("users"), updateUser);
  router.delete("/users/:id", AuthenticatedMiddleware, PermissionMiddleware("users"), deleteUser);

  router.get("/permissions", AuthenticatedMiddleware, permission);

  router.get("/roles", AuthenticatedMiddleware, PermissionMiddleware("roles"), roles);
  router.post("/roles", AuthenticatedMiddleware, PermissionMiddleware("roles"), createRole);
  router.get("/roles/:id", AuthenticatedMiddleware, PermissionMiddleware("roles"), getRole);
  router.put("/roles/:id", AuthenticatedMiddleware, PermissionMiddleware("roles"), updateRole);
  router.delete("/roles/:id", AuthenticatedMiddleware, PermissionMiddleware("roles"), deleteRole);

  router.get(
    "/products/list/:page",
    AuthenticatedMiddleware,
    PermissionMiddleware("products"),
    listProducts,
  );
  router.post(
    "/products",
    AuthenticatedMiddleware,
    PermissionMiddleware("products"),
    createProduct,
  );
  router.get(
    "/products/id/:id",
    AuthenticatedMiddleware,
    PermissionMiddleware("products"),
    getProduct,
  );
  router.put(
    "/products/:id",
    AuthenticatedMiddleware,
    PermissionMiddleware("products"),
    updateProduct,
  );
  router.delete(
    "/products/:id",
    AuthenticatedMiddleware,
    PermissionMiddleware("products"),
    deleteProduct,
  );

  router.post("/upload", AuthenticatedMiddleware, upload);
  router.use("/upload", express.static("uploads")); //ให้domainข้างนอกเข้ามาดูไฟล์รูปได้

  router.get("/order/list/:page", AuthenticatedMiddleware, PermissionMiddleware("orders"), order);
};
