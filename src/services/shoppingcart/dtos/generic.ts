export interface CartItem {
    cartId: string,
    productId: string,
    variantId: string
    quantity: number,
    variant: any
    product: any
    pictures: Picture[]
}

export interface Cart {
    _id:             string;
    userId:          string;
    items:           Item[];
    active:          boolean;
    createdAt:       Date;
    updatedAt:       Date;
    v:             number;
    total_reseller:  number;
    total_retail:    number;
    total_wholesale: number;
}

export interface Item {
    product:              Product;
    variant:              Variant | null;
    quantity:             number;
    stock:                Stock;
    is_wholesale_package: boolean;
    predefined_quantity:  number;
    wholesale_variants:   WholesaleVariant[];
}

export interface Product {
    _id:      string;
    name:     string;
    code:     string;
    prices:   Prices;
    pictures: Picture[];
    wholesale_data?: WholesaleData;
}

export interface Picture {
    url:      string;
    alt_text: string;
}

export interface Prices {
    retail:    number;
    reseller:  number;
    wholesale: Wholesale;
}

export interface Wholesale {
    half_dozen: number;
    dozen:      number;
}

export interface WholesaleVariant {
    variant:  Variant;
    quantity: number;
    stock:    Stock;
}

export interface Stock {
    _id:        string;
    product:    string;
    variant:    string;
    quantity:   number;
    cost_price: number;
    date:       Date;
    createdAt:  Date;
    updatedAt:  Date;
    v:        number;
}

export interface Variant {
    size:      string;
    color:     string;
    size_label: string;
    color_label: string;
    _id:       string;
    createdAt: Date;
    updatedAt: Date;
}

export interface VariantsQuantityDto {
    [key: string]: number
}

export interface CreateNewCartRequestDto {
    sessionId: string
}

export interface AddToCartRequestDto {
    productId: string,
    variantId: string
    quantity: number
    cartId?: string,
    isWholesalePackage?: boolean
}

export interface RemoveFromCartRequestDto {
    cartId: string,
    variantId: string,
    productId: string,
    isWholesalePackage: boolean
}

export interface UpdateQuantityRequestDto {
    params: {
        cartId: string,
        productId: string,
    },
    body: {
        quantity: number,
        variantId: string,
        isWholesalePackage?: boolean,
        predefinedQuantity?: number
    }
}

export interface CartReponseDto {
    cart: Cart
}

export interface WholesaleData {
    is_wholesaler: boolean;
    minimum_quantity: number;
    package_type?: 'simple' | 'complex';
}