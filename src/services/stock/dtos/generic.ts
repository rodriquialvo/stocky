export interface PostStockDto {
    product: string;
    variant: {
        size: string;
        color: string;
    };
    costPrice: number;
    quantity: number;
}

export interface ResponsePostStockDto {
    stock: {
        id: string,
        product: string,
        variant: string,
        quantity: number,
        costPrice: number,
        date: string
    }
}

export interface ResponsePostStockMultipleDto {
    stocks: ResponsePostStockDto[]
}