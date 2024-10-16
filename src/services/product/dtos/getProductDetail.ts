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
