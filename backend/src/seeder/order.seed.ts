import { faker } from "@faker-js/faker";
import { randomInt } from "node:crypto";
import { AppDataSource } from "../configs/data-source.js";
import { OrderItem } from "../entities/order-item.entity.js";
import { Order } from "../entities/order.entity.js";

const ORDER_COUNT = 20;

async function seed() {
  try {
    await AppDataSource.initialize();
    console.log("Database connected for order seeding...");

    const orderRepository = AppDataSource.getRepository(Order);
    const orderItemRepository = AppDataSource.getRepository(OrderItem);

    for (let i = 0; i < ORDER_COUNT; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();

      const order = await orderRepository.save(
        orderRepository.create({
          first_name: firstName,
          last_name: lastName,
          email: faker.internet.email({ firstName, lastName }),
        }),
      );
      console.log("🚀 ~ seed ~ order:", order);

      const items = Array.from({ length: randomInt(1, 6) }, () =>
        orderItemRepository.create({
          product_title: faker.commerce.productName(),
          price: Number(faker.commerce.price({ min: 10, max: 1000 })),
          quantity: randomInt(1, 6),
          order,
        }),
      );

      await orderItemRepository.save(items);
    }

    console.log(`Seeded ${ORDER_COUNT} orders successfully!`);
  } catch (error) {
    console.error("Error during order seeding:", error);
    process.exitCode = 1;
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
}

void seed();
