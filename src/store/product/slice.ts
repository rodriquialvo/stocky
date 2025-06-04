import { create } from 'zustand';
import { Status, getDefaultStatus } from '../helper/statusStateFactory';
import { Product } from '../../services/product/dtos/getProducts';
import { ProductDetail, ProductDetailWithStocks } from '../../services/product/dtos/getProductDetail';
import { FiltersState, initialStateFilters } from '../../components/FilterPanel/constants';

type State = {
  status: Status;
  products: Product[];
  total: number;
  product: ProductDetail | null;
  productsWhitStocks: {
    [key: string]: ProductDetailWithStocks
  },
  productsByCodeOrName: Product[],
  // calculated prices in create product
  calculatedPrices: any
  productsSelected: Product[],
  productsFilters: FiltersState
  updateProductStatus: Status
  createProductStatus: Status
};

const initialState: State = {
  status: getDefaultStatus(),
  products: [],
  total: 0,
  product: null,
  productsWhitStocks: {},
  productsByCodeOrName: [],
  calculatedPrices: {},
  productsSelected: [],
  productsFilters: initialStateFilters,
  updateProductStatus: getDefaultStatus(),
  createProductStatus: getDefaultStatus()
};

type Action = {
  setStatus: (status: Status) => void;
  getProducts: (params: {}) => void;
  setProducts: (products: any[]) => void;
  setProduct: (product: ProductDetail) => void;
  setProductsWhitStocks: (productsWhitStocks: { [key: string]: ProductDetailWithStocks }) => void;
  setProductsByCodeOrName: (productsByCodeOrName: Product[]) => void;
  setCalculatedPrices: (calculatedPrices: any) => void
  setProductsSelected: (products: Product[]) => void
  setProductsFilters: (productsFilters: any) => void,
  setTotalProducts: (total: number) => void,
  setUpdateProductStatus: (status: Status) => void,
  setCreateProductStatus: (status: Status) => void
};

// Create your store, which includes both state and (optionally) actions
export const useProductStore = create<State & Action>()((set, get) => ({
  ...initialState,
  setStatus: (status: Status) => set({ status }),
  getProducts: () => get().products,
  setProducts: (products) => set({ products }),
  setProduct: (product) => set({ product }),
  setProductsWhitStocks: (productsWhitStocks) => set({ productsWhitStocks }),
  setProductsByCodeOrName: (productsByCodeOrName) => set({ productsByCodeOrName }),
  setCalculatedPrices: (calculatedPrices) => set({ calculatedPrices }),
  setProductsSelected: (products) => set({productsSelected: products}),
  setProductsFilters: (productsFilters) => set({productsFilters}),
  setTotalProducts: (total: number) => set({ total }),
  setUpdateProductStatus: (status: Status) => set({ updateProductStatus: status }),
  setCreateProductStatus: (status: Status) => set({ createProductStatus: status })
}));
