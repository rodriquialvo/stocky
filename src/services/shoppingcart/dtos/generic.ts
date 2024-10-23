
export interface CartItem {
    cartId: string,
    productId: string,
    variantId: string
    quantity: number,
    variant: any
    product: any
}

export interface Cart {
    id: string,
    total: number,
    items: CartItem[]
    _id?: string,
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