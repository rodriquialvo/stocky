import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Status, getDefaultStatus } from '../helper/statusStateFactory';
import { Product } from '../../services/product/dtos/getProducts';
import { ProductDetail } from '../../services/product/dtos/getProductDetail';

type State = {
  status: Status;
  products: Product[];
  total: number;
  product: ProductDetail | null;
};

const initialState: State = {
  status: getDefaultStatus(),
  products: [],
  total: 0,
  product: null,
};

type Action = {
  setStatus: (status: Status) => void;
  getProducts: (params: {}) => void;
  setProducts: (products: any[]) => void;
  setProduct: (product: ProductDetail) => void;
};

// Create your store, which includes both state and (optionally) actions
export const useProductStore = create<State & Action>()(
  persist(
    (set, get) => ({
      ...initialState,
      setStatus: (status: Status) => set({ status }),
      getProducts: () => get().products,
      setProducts: (products) => set({ products}),
      setProduct: (product) => set({ product}),
    }),
    {
      name: 'products-store', // nombre del key en localStorage
      // puedes incluir otras opciones aquí si lo deseas
    }
  )
);
