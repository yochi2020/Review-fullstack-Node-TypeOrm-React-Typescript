import "dotenv/config";
import z from "zod";

const envSchema = z.object({
  SECRET_KEY: z.string(),
  DB_HOST: z.string(),
  PORT: z.coerce.number().default(3000),
});

export const env = envSchema.parse(process.env);
