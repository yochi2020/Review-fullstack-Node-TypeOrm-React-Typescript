import type { Response } from "express";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Result = (res: Response, data: any, status = 200, contentType?: string) => {
  if (contentType) {
    res.set("Content-Type", contentType);
    return res.send(data);
  }
  return res.status(status).json({
    data: data,
    status,
  });
};
