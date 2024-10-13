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

export interface PostProductResponse {
  product: Product;
}

export interface Product {
  _id:          string;
  name:        string;
  description: string;
  code:        string;
  categories:  string[];
  attributes:  Attributes;
  pictures:    Picture[];
  prices:      Prices;
}

export interface Attributes {
  brand: string;
}

export interface Picture {
  url:      string;
  alt_text: string;
}

export interface Prices {
  retail:   number;
  reseller: number;
}

