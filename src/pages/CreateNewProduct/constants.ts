import { Product } from '../../services/product/dtos/getProducts';
import { ProductFormData } from './interfaces';
export const initialStateProductformData: (product?: Product) => ProductFormData = (product = null) => ({
    name: product?.name || "",
    code: product?.code || "",
    description: product?.description || "",
    categories: product?.categories.map(category => category.id) || [],
    attributes: product?.attributes || {
      brand: ""
    },
    pictures: product?.pictures || [],
    prices: {
      cost: product ? String(product.prices.cost) : "",
      retail: product?.prices.retail || 0,
      reseller: product?.prices.reseller || 0
    },
    percentages: {
      retail: 30,
      reseller: 80
    },
    colors: product?.colors || [],
    sizeType: product?.sizeType || ""
  })