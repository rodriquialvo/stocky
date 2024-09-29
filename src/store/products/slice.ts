// productStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Product {
  brand: string;
  name: string;
  article: string;
  description: string;
  size: string;
  costPrice: number;
  salePrice: number;
  color: string;
  category: string;
  quantity: number;
}

interface ProductStore {
  product: Product;
  updateProduct: (field: keyof Product, value: string | number) => void;
  saveProduct: () => void;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      product: {
        brand: '',
        name: '',
        article: '',
        description: '',
        size: '',
        costPrice: 0,
        salePrice: 0,
        color: '',
        category: '',
        quantity: 0,
      },
      updateProduct: (field, value) =>
        set((state) => ({
          product: { ...state.product, [field]: value },
        })),
      saveProduct: () => {
        // Aquí iría la lógica para guardar el producto
        console.log('Producto guardado:', useProductStore.getState().product);
        // Podrías agregar aquí una llamada a una API para guardar el producto en el backend
      },
    }),
    {
      name: 'product-storage',
    }
  )
);