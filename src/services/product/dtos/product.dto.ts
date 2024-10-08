export interface ProductResponse {
  products: Product[];
}

export interface Product {
  id: number;
  name: string;
  description: string;
  brand: string;
  quantity: number;
  categories: string[];
  costPrice: number;
  resellerPrice: number;
  publicPrice: number;
}
