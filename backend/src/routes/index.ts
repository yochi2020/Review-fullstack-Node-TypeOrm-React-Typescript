import { Router } from "express";

import { authRouter } from "./auth.routes.js";
import { userRouter } from "./user.routes.js";
import { roleRouter } from "./role.routes.js";
import { permissionRouter } from "./permission.routes.js";
import { productRouter } from "./product.routes.js";
import { orderRouter } from "./order.routes.js";
import { uploadRouter } from "./upload.routes.js";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/user", userRouter);
apiRouter.use("/roles", roleRouter);
apiRouter.use("/permissions", permissionRouter);
apiRouter.use("/products", productRouter);
apiRouter.use("/orders", orderRouter);
apiRouter.use("/uploads", uploadRouter);
