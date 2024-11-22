import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Status, getDefaultStatus } from '../helper/statusStateFactory';
import { Product } from '../../services/product/dtos/getProducts';
import { ProductDetail, ProductDetailWithStocks } from '../../services/product/dtos/getProductDetail';
import { ProductAttribute } from '../../services/product/dtos/getProductAtributes';

type State = {
  status: Status;
  sizes: ProductAttribute[];
  sizesTypes: ProductAttribute[];
  AllSizesAndTypes: ProductAttribute[];
};

const initialState: State = {
  status: getDefaultStatus(),
  sizes: [],
  sizesTypes: [],
  AllSizesAndTypes: []
};

type Action = {
  setStatus: (status: Status) => void;
  setSizes: (sizes: ProductAttribute[]) => void;
  setSizesTypes: (sizesTypes: ProductAttribute[]) => void;
  setAllSizesAndTypes: (sizesTypes: ProductAttribute[]) => void;
};

// Create your store, which includes both state and (optionally) actions
export const useProductAtributesStore = create<State & Action>()(
    (set, get) => ({
      ...initialState,
      setStatus: (status: Status) => set({ status }),
      setSizes: (sizes) => set({sizes}),
      setSizesTypes: (sizesTypes) => set({sizesTypes}),
      setAllSizesAndTypes: (AllSizesAndTypes) => set({AllSizesAndTypes}),
    }),
  )

