export interface GetProductAtributesResponse {
    productAttributes: ProductAttribute[];
}

export interface ProductAttribute {
    subtype: null;
    id:     string;
    _id: string
    type:    string;
    value:   string;
    label: string
}
