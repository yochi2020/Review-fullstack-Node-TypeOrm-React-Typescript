import "dotenv/config";
import z from "zod";

const envSchema = z.object({
  SECRET_KEY: z.string(),
  PORT: z.coerce.number().default(3000),
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_DATABASE: z.string(),
});

export const env = envSchema.parse(process.env);
