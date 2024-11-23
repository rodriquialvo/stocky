import { ProductFormData } from './interfaces';
export const initialStateProductformData: ProductFormData = {
    name: "",
    code: "",
    description: "",
    categories: [
      ""
    ],
    attributes: {
      brand: ""
    },
    pictures: [],
    prices: {
      cost: 0,
      retail: 0,
      reseller: 0
    },
    percentages: {
      retail: 0,
      reseller: 0
    },
    colors: [],
    sizeType: ""
  }