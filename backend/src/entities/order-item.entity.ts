import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity.js";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  product_title!: string;

  @Column({ type: "varchar" })
  price!: number;

  @Column({ type: "varchar" })
  quantity!: number;

  @ManyToOne(() => Order, (Order) => Order.order_item)
  @JoinColumn({ name: "order_id" })
  order!: Order;
}
