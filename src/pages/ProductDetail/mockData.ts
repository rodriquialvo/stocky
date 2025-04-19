import { ProductDetail } from '../../services/product/dtos/getProductDetail';

// Datos ficticios para simular un producto mayorista con mucho stock
export const MOCK_WHOLESALE_PRODUCT: ProductDetail = {
  id: "mock-wholesale-id",
  name: "Producto Mayorista de Prueba",
  description: "Este es un producto de prueba para simular ventas mayoristas",
  code: "WHOLESALE-001",
  categories: ["Mayorista", "Prueba"],
  attributes: {
    brand: "Marca de Prueba"
  },
  pictures: [
    { 
      url: "https://via.placeholder.com/400x400",
      alt_text: "Producto Mayorista de Prueba"
    }
  ],
  prices: {
    retail: 1500,
    reseller: 1200,
    cost: 800,
    wholesale: {
      half_dozen: 1000,
      dozen: 1200
    }
  },
  hasStock: true,
  wholesaleData: {
    isWholesaler: true,
    minimumQuantity: 6
  },
  stocks: [
    {
      id: "stock-1",
      variant: {
        id: "variant-1",
        color: "Negro",
        size: "S"
      },
      quantity: 1000,
      costPrice: 800,
      date: new Date()
    },
    {
      id: "stock-2",
      variant: {
        id: "variant-2",
        color: "Negro",
        size: "M"
      },
      quantity: 1500,
      costPrice: 800,
      date: new Date()
    },
    {
      id: "stock-3",
      variant: {
        id: "variant-3",
        color: "Negro",
        size: "L"
      },
      quantity: 2000,
      costPrice: 800,
      date: new Date()
    },
    {
      id: "stock-4",
      variant: {
        id: "variant-4",
        color: "Blanco",
        size: "S"
      },
      quantity: 1200,
      costPrice: 800,
      date: new Date()
    },
    {
      id: "stock-5",
      variant: {
        id: "variant-5",
        color: "Blanco",
        size: "M"
      },
      quantity: 1800,
      costPrice: 800,
      date: new Date()
    },
    {
      id: "stock-6",
      variant: {
        id: "variant-6",
        color: "Blanco",
        size: "L"
      },
      quantity: 2500,
      costPrice: 800,
      date: new Date()
    }
  ],
  colors: ["Negro", "Blanco"],
  sizes: ["S", "M", "L"]
}; 