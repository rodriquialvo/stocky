export interface Sale {
    id: string;
    code: string;
    date: string;
    status: string;
    details: Detail[];
    stocksUpdated: StocksUpdated[];
    cartId: string;
    weekCode: number;
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
    details?: Detail[];
    cartId: string;
}

export interface SalesReponseDto {
    sales: Sale[];
}

export interface SaleReponseDto {
    sale: Sale;
}

export interface UpdateStatusRequestDto {
    status: string;
}

export interface GetSalesFilter {
 
}

export interface SalesListDto {
    sales: Sale[];
    total: number;
}