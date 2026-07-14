import { Table, TableIndex, type MigrationInterface, type QueryRunner } from "typeorm";

export class CreateInitialSchema1752300000000 implements MigrationInterface {
  name = "CreateInitialSchema1752300000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "permission",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "name", type: "varchar" },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "role",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "name", type: "varchar" },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "firstName", type: "varchar" },
          { name: "lastName", type: "varchar" },
          { name: "isActive", type: "boolean" },
          { name: "email", type: "varchar", isUnique: true },
          { name: "password", type: "varchar" },
          { name: "role_id", type: "integer", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "FK_user_role",
            columnNames: ["role_id"],
            referencedTableName: "role",
            referencedColumnNames: ["id"],
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "product",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "title", type: "varchar" },
          { name: "description", type: "text" },
          { name: "image", type: "varchar" },
          { name: "price", type: "numeric" },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "order",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "first_name", type: "varchar" },
          { name: "last_name", type: "varchar" },
          { name: "email", type: "varchar" },
          { name: "created_at", type: "timestamp without time zone", default: "now()" },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "order_item",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "product_title", type: "varchar" },
          { name: "price", type: "varchar" },
          { name: "quantity", type: "varchar" },
          { name: "order_id", type: "integer", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "FK_order_item_order",
            columnNames: ["order_id"],
            referencedTableName: "order",
            referencedColumnNames: ["id"],
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "role_permission",
        columns: [
          { name: "role_id", type: "integer", isPrimary: true },
          { name: "permission_id", type: "integer", isPrimary: true },
        ],
        foreignKeys: [
          {
            name: "FK_role_permission_role",
            columnNames: ["role_id"],
            referencedTableName: "role",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FK_role_permission_permission",
            columnNames: ["permission_id"],
            referencedTableName: "permission",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      }),
    );

    await queryRunner.createIndex(
      "role_permission",
      new TableIndex({ name: "IDX_role_permission_role", columnNames: ["role_id"] }),
    );
    await queryRunner.createIndex(
      "role_permission",
      new TableIndex({ name: "IDX_role_permission_permission", columnNames: ["permission_id"] }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("role_permission", true);
    await queryRunner.dropTable("order_item", true);
    await queryRunner.dropTable("order", true);
    await queryRunner.dropTable("product", true);
    await queryRunner.dropTable("user", true);
    await queryRunner.dropTable("role", true);
    await queryRunner.dropTable("permission", true);
  }
}
