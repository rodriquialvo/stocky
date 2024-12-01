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
      cost: '',
      retail: 0,
      reseller: 0
    },
    percentages: {
      retail: 30,
      reseller: 80
    },
    colors: [],
    sizeType: ""
  }