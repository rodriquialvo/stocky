export interface GetProductsResponse {
    products: Product[];
    total: number;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    code: string;
    categories: Category[];
    attributes: Attributes;
    pictures: Picture[];
    prices: Prices;
    hasStock: boolean;
}

export interface Attributes {
    brand: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
}

export interface Picture {
    url: string;
    alt_text: string;
}

export interface Prices {
    cost: number;
    retail: number;
    reseller: number;
}