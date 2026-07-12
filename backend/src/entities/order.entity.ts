import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./order-item.entity.js";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  first_name!: string;

  @Column({ type: "varchar" })
  last_name!: string;

  @Column({ type: "varchar" })
  email!: string;

  @CreateDateColumn()
  created_at!: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  order_item!: OrderItem[];
}
