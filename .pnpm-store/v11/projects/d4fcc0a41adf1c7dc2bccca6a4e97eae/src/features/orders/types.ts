export type Order = {
  id: number;
  name: string;
  email: string;
  total: string;
  created_at: string;
  order_items: OrderItem[];
};

export type OrderItem = {
  id: number;
  product_title: string;
  price: number | string;
  quantity: number | string;
};

export type OrderListResponse = {
  result: Order[];
  meta: {
    total: number;
    page: number;
    last_page: number;
  };
};
