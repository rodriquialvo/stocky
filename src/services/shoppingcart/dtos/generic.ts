
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
    _id:       string;
    userId:    string;
    items:     Item[];
    total:     number;
    active:    boolean;
    createdAt: Date;
    updatedAt: Date;
    __v:       number;
}

export interface Item {
    product:  Product;
    variant:  Variant;
    quantity: number;
    _id:      string;
}

export interface Product {
    categories_filter: any[];
    categories:        any[];
    name:              string;
    code:              string;
    pictures:          Picture[];
    prices:            Prices;
    has_stock:         boolean;
    _id:               string;
    createdAt:         Date;
    updatedAt:         Date;
}

export interface Picture {
    url:      string;
    alt_text: string;
}

export interface Prices {
    retail:   number;
    reseller: number;
}

export interface Variant {
    size:      string;
    color:     string;
    _id:       string;
    createdAt: Date;
    updatedAt: Date;
}

export interface VariantsQuantityDto {
    [key: string]: number
}

export interface CreateNewCartRequestDto {
    // empty
}

export interface AddToCartRequestDto {
    productId: string,
    variantId: string
    quantity: number
    cartId?: string,
}

export interface RemoveFromCartRequestDto {
    cartId: string,
    variantId: string
}

export interface UpdateQuantityRequestDto {
    params: {
        cartId: string,
        variantId: string
    },
    body: {
        quantity: number
    }
}

export interface CartReponseDto {
    cart: Cart
}