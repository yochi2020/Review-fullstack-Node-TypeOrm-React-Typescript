import type { Request, Response } from "express";
export const controllerTest = async (req: Request, res: Response) => {
  try {
    // เขียน logic ของ controller ที่นี่
    res.json({ message: "controllerTest success" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ error: message });
  }
};
