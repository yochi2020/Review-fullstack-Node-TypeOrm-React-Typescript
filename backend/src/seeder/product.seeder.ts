import { AppDataSource } from "../configs/data-source.js";
import { Product } from "@/entities/product.entity.js";
import { faker } from "@faker-js/faker";
import { randomInt } from "node:crypto";

async function seed() {
  try {
    await AppDataSource.initialize();
    // eslint-disable-next-line no-console
    console.log("Database connected for seeding...");

    const productRepository = AppDataSource.getRepository(Product);
    const products = Array.from({ length: 30 }, () =>
      productRepository.create({
        price: randomInt(10, 100),
        title: faker.lorem.words(2),
        description: faker.lorem.words(20),
        image: faker.image.dataUri(),
      }),
    );

    await productRepository.save(products);
    // eslint-disable-next-line no-console
    console.log("Seeded 30 products successfully!");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error during product seeding:", error);
    process.exitCode = 1;
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
}

void seed();
