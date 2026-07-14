import { DataSource } from "typeorm";
import { env } from "./env.js";
const isCompiled = import.meta.url.includes("/dist/") || import.meta.url.includes("\\dist\\");
const entities = isCompiled ? ["dist/entities/*.js"] : ["src/entities/*.ts"];
const migrations = isCompiled ? ["dist/migrations/*.js"] : ["src/migrations/*.ts"];
export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  entities,
  migrations,
  migrationsTableName: "migrations",
  logging: false,
  synchronize: false,
});
