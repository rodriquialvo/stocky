export interface GetProductAtributesResponse {
    productAttributes: ProductAttribute[];
}

export interface GetProductAtributesSubTypesResponse {
    productAttributeSubtypes: ProductAttribute[];
}

export interface ProductAttribute {
    subtype: null;
    _id:     string;
    type:    string;
    value:   string;
}
