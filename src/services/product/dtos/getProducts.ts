export interface GetProductsResponse {
    products: Product[];
}

export interface Product {
    id:          string;
    name:        string;
    description: string;
    code:        string;
    categories:  Category[];
    attributes:  Attributes;
    pictures:    Picture[];
    prices:      Prices;
}

export interface Attributes {
    brand: string;
}

export interface Category {
    id:   string;
    name: string;
    slug: string;
}

export interface Picture {
    url:      string;
    alt_text: string;
}

export interface Prices {
    retail:   number;
    reseller: number;
}
