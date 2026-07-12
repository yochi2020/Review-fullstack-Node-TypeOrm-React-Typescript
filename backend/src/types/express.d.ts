import type { User } from "@/entities/User";

declare global {
  namespace Express {
    interface Request {
      user?: User;
      cookies: Record<string, string>;
    }
  }
}

export {};
