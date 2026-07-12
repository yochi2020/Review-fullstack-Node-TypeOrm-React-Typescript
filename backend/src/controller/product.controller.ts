import { AppDataSource } from "@/configs/data-source.js";
import { Product } from "@/entities/product.entity.js";
import type { Request, Response } from "express";

const repository = AppDataSource.getRepository(Product);

export const listProducts = async (req: Request, res: Response) => {
  const page = parseInt(req.params.page as string);
  const limit = 10;
  const [result, total] = await repository.findAndCount({
    skip: (page - 1) * limit,
    take: limit,
  });

  res.json({
    result,
    meta: {
      total,
      page,
      last_page: Math.ceil(total / page),
    },
  });
};

export const createProduct = async (req: Request, res: Response) => {
  const result = await repository.save(req.body);
  res.status(201).json(result);
};

export const getProduct = async (req: Request<{ id: string }>, res: Response) => {
  const result = await repository.findOne({
    where: {
      id: Number(req.params.id),
    },
  });

  if (!result) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  res.json(result);
};

export const updateProduct = async (req: Request<{ id: string }>, res: Response) => {
  const id = Number(req.params.id);
  const product = await repository.findOne({
    where: {
      id,
    },
  });

  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  const result = await repository.save({
    ...product,
    ...req.body,
    id,
  });

  res.json(result);
};

export const deleteProduct = async (req: Request<{ id: string }>, res: Response) => {
  const result = await repository.delete(Number(req.params.id));

  if (!result.affected) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  res.json(result);
};
