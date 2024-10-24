export interface GetProductDetailResponse {
    product: ProductDetail;
}

export interface ProductDetail {
    id:          string;
    name:        string;
    description: string;
    code:        string;
    categories:  string[];
    attributes:  Attributes;
    pictures:    Picture[];
    prices:      Prices;
    hasStock:    boolean;
    stocks?:      Stock[];
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

export interface GetProductDetailWhitStocksResponse {
    product: ProductDetailWithStocks;
}

export interface ProductDetailWithStocks extends ProductDetail {
    stocks: Stock[];
    lastRequest: Date;
}

export interface Stock {
    id:        string;
    quantity:  number;
    variant:   Variant;
    costPrice: number;
    date:      Date;
}

export interface Variant {
    id:    string;
    color: string;
    size:  string;
}