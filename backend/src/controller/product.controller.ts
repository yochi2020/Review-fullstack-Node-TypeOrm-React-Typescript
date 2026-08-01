import { AppDataSource } from "@/configs/data-source.js";
import { Product } from "@/entities/product.entity.js";
import type { Request, Response } from "express";

const repository = AppDataSource.getRepository(Product);
type ProductParams = { productId: string };

const parseProductId = (req: Request<ProductParams>, res: Response) => {
  const productId = Number(req.params.productId);

  if (!Number.isInteger(productId) || productId <= 0) {
    res.status(400).json({ message: "Invalid product id" });
    return null;
  }

  return productId;
};

export const listProducts = async (req: Request, res: Response) => {
  const requestedPage = Number.parseInt(String(req.query.page ?? "1"), 10);
  const page = Number.isNaN(requestedPage) ? 1 : Math.max(1, requestedPage);
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
      last_page: Math.ceil(total / limit),
    },
  });
};

export const createProduct = async (req: Request, res: Response) => {
  const result = await repository.save(req.body);
  res.status(201).json(result);
};

export const getProduct = async (req: Request<ProductParams>, res: Response) => {
  const productId = parseProductId(req, res);
  if (productId === null) {
    return;
  }

  const result = await repository.findOne({
    where: {
      id: productId,
    },
  });

  if (!result) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  res.json(result);
};

export const updateProduct = async (req: Request<ProductParams>, res: Response) => {
  const productId = parseProductId(req, res);
  if (productId === null) {
    return;
  }

  const product = await repository.findOne({
    where: {
      id: productId,
    },
  });

  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  const result = await repository.save({
    ...product,
    ...req.body,
    id: productId,
  });

  res.json(result);
};

export const deleteProduct = async (req: Request<ProductParams>, res: Response) => {
  const productId = parseProductId(req, res);
  if (productId === null) {
    return;
  }

  const result = await repository.delete(productId);

  if (!result.affected) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  res.json(result);
};
