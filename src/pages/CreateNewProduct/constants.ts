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
      retail: product?.percentages?.retail || 30,
      reseller: product?.percentages?.reseller || 80,
      wholesale: product?.percentages?.wholesale || {
        half_dozen: 15,
        dozen: 10
      }
    },
    colors: product?.colors || [],
    sizeType: product?.sizeType || "",
    wholesaleData: product?.wholesaleData ? {
      isWholesaler: product.wholesaleData.isWholesaler ? "true" : "false",
      packageType: product.wholesaleData.packageType || "complex",
      minimumQuantity: product.wholesaleData.minimumQuantity || 6
    } : {
      isWholesaler: "false",
      packageType: "complex",
      minimumQuantity: 6
    }
  })