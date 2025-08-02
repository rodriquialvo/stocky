import { User } from "../../session/dtos/session.dto";

export interface Sale {
  id: string;
  code: string;
  date: string;
  details: Detail[];
  stocksUpdated: StocksUpdated[];
  cartId: string;
  weekCode: number;
  user: User;
  creationDate: string;
  status: "pending" | "approved" | "rejected";
}
export interface StocksUpdated {
  stock: string;
  quantity: number;
  prices: Prices;
}
export interface Detail {
  productId: string;
  variantId: string;
  variant: VariantData;
  quantity: number;
  prices: Prices;

}
export interface Prices {
  retail: number;
  reseller: number;
  wholesale: number;
  cost?: number;
}

interface VariantData {
  productName: string;
  productCode: string;
  variantAttributes: VariantAttribute[];
}
interface VariantAttribute {
  name: string;
  value: string;
}

export interface CreateSaleRequestDto {
  date?: string;
  cartId: string;
  customerData: CustomerData;
}

export interface SalesReponseDto {
  sales: Sale[];
  total: number;
}

export interface CustomerData {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
  comments: string;
}

export interface SaleReponseDto {
  sale: Sale;
}

export interface UpdateStatusRequestDto {
  status: string;
}

export interface PostSaleResponseDto {
  sale: Sale
}

export interface GetSalesFilter {

}

export interface SalesListDto {
  sales: Sale[];
  total: number;
}