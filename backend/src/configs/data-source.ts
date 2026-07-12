import { DataSource } from "typeorm";

const isCompiled = import.meta.url.includes("/dist/") || import.meta.url.includes("\\dist\\");
const entities = isCompiled ? ["dist/entities/*.js"] : ["src/entities/*.ts"];

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "admin",
  password: "admin123",
  database: "testdb",
  entities,
  logging: false,
  synchronize: true,
});
