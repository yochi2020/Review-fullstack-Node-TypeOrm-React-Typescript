export type Product = {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number | string;
};

export type ProductFormValues = {
  title: string;
  description: string;
  image: string;
  price: string;
};

export type ProductPayload = {
  title: string;
  description: string;
  image: string;
  price: number;
};
