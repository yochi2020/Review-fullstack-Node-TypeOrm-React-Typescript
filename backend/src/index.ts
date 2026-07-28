import "reflect-metadata";
import morgan from "morgan";
import express, { type Request, type Response } from "express";
import cors from "cors";
import { apiRouter } from "./routes/index.js";
import { AppDataSource } from "@/configs/data-source.js";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error.middleware.js";
import path from "path";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3002"],
    credentials: true,
  }),
);
app.use(
  "/uploads",
  express.static(path.resolve(process.cwd(), "uploads"), {
    maxAge: "1d",
    immutable: false,
  }),
);
app.use("/api", apiRouter);
app.all("/{*splat}", (_req: Request, res: Response) => {
  res.json("ไม่มีapiที่ระบุ");
});
app.use(errorHandler);
async function startServer() {
  try {
    await AppDataSource.initialize();
    // eslint-disable-next-line no-console
    console.error("Data Source has been initialized!");
    app.listen(process.env.PORT, () => {
      // eslint-disable-next-line no-console
      console.error(`server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error during Data Source initialization", error);
  }
}

await startServer();
