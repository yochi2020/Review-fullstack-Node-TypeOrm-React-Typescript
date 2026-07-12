import "reflect-metadata";
import morgan from "morgan";
import express, { type Request, type Response } from "express";
import cors from "cors";
import { router } from "./routes.js";
import { AppDataSource } from "@/configs/data-source.js";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

router(app);
app.all("/{*splat}", (_req: Request, res: Response) => {
  res.json("ไม่มีapiที่ระบุ");
});
app.use(errorHandler);
async function startServer() {
  try {
    await AppDataSource.initialize();
    // eslint-disable-next-line no-console
    console.error("Data Source has been initialized!");

    app.listen(3001, () => {
      // eslint-disable-next-line no-console
      console.error("server is running on port 3001");
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error during Data Source initialization", error);
  }
}

await startServer();
