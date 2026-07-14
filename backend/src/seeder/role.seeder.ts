// src/seeder/role.seeder.ts
import { AppDataSource } from "../configs/data-source.js";
import { Permission } from "../entities/permission.entity.js";
import { Role } from "../entities/role.entity.js";

async function seed() {
  try {
    await AppDataSource.initialize();
    // eslint-disable-next-line no-console
    console.log("Database connected for seeding...");

    const permissionRepository = AppDataSource.getRepository(Permission);
    const roleRepository = AppDataSource.getRepository(Role);

    const perms = [
      "view_users",
      "edit_users",
      "view_roles",
      "edit_roles",
      "view_products",
      "edit_products",
      "view_orders",
      "edit_orders",
    ];
    const permissions: Permission[] = [];

    for (const permissionName of perms) {
      const permission = new Permission();
      permission.name = permissionName;
      permissions.push(await permissionRepository.save(permission));
    }

    // TODO: เพิ่มการสร้าง Role เช่น Admin, Editor, Viewer

    // ตัวอย่าง:

    await roleRepository.save({ name: "Admin", permissions });

    delete permissions[3];

    await roleRepository.save({ name: "Editor", permissions });

    delete permissions[1];
    delete permissions[5];
    delete permissions[7];
    await roleRepository.save({ name: "Viewer", permissions });
    // eslint-disable-next-line no-console
    console.log("Seeding completed successfully!");
    await AppDataSource.destroy();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error during seeding:", error);
  }
}

// eslint-disable-next-line no-console
seed().catch((error) => console.log(error));
