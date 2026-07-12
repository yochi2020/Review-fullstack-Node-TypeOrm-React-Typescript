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

export const router = (router: Router) => {
  router.get("/test", controllerTest);

  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.post("/auth/logout", AuthenticatedMiddleware, logout);
  router.get("/auth/me", AuthenticatedMiddleware, getCurrentUser);
  router.patch("/auth/me/profile", AuthenticatedMiddleware, updateCurrentUserProfile);
  router.patch("/auth/me/password", AuthenticatedMiddleware, updateCurrentUserPassword);

  router.get("/users/:page", AuthenticatedMiddleware, listUsers);
  router.post("/users", AuthenticatedMiddleware, createUser);
  router.get("/users/id/:id", AuthenticatedMiddleware, getUser);
  router.put("/users/:id", AuthenticatedMiddleware, updateUser);
  router.delete("/users/:id", AuthenticatedMiddleware, deleteUser);

  router.get("/permissions", AuthenticatedMiddleware, permission);

  router.get("/roles", AuthenticatedMiddleware, roles);
  router.post("/roles", AuthenticatedMiddleware, createRole);
  router.get("/roles/:id", AuthenticatedMiddleware, getRole);
  router.put("/roles/:id", AuthenticatedMiddleware, updateRole);
  router.delete("/roles/:id", AuthenticatedMiddleware, deleteRole);

  router.get("/products/:page", AuthenticatedMiddleware, listProducts);
  router.post("/products", AuthenticatedMiddleware, createProduct);
  router.get("/products/:id", AuthenticatedMiddleware, getProduct);
  router.put("/products/:id", AuthenticatedMiddleware, updateProduct);
  router.delete("/products/:id", AuthenticatedMiddleware, deleteProduct);

  router.post("/upload", AuthenticatedMiddleware, upload);
  router.use("/", express.static("uploads")); //ให้domainข้างนอกเข้ามาดูไฟล์รูปได้
};
