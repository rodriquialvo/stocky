import { create } from 'zustand';
import { SalesListDto } from '../../services/sale/dtos/generic';
import { Status, getDefaultStatus } from '../helper/statusStateFactory';

type State = {
  status: Status;
  list: SalesListDto;
  usersInSales: any,
  productsInSalesByUser: any,
  productsInSales: any
};

const initialState: State = {
  status: getDefaultStatus(),
  list: {
    sales: [],
    total: 0
  },
  usersInSales: [],
  productsInSalesByUser: {},
  productsInSales: {}
};

type Action = {
  setStatus: (status: Status) => void;
  getSales: (params: {}) => void;
  setSales: (data: any) => void;
  setUsersInSales: (data: any) => void;
  getUsersInSales: () => any;
  setProductsInSalesByUser: (data: any) => void;
  getProductsInSalesByUser: () => any,
  setProductsInSales: (data: any) => void,
  getProductsInSales: () => any,
  clearSaleWeek: () => void
};

// Create your store, which includes both state and (optionally) actions
export const useSaleStore = create<State & Action>()((set, get) => ({
  ...initialState,
  setStatus: (status: Status) => set({ status }),
  getSales: () => get().list.sales,
  setSales: (data) => set({ list: { sales: data.sales, total: data.total } }),
  setUsersInSales: (users) => set({ usersInSales: users }),
  getUsersInSales: () => get().usersInSales,
  setProductsInSalesByUser: ({ userId, products }) => set({ productsInSalesByUser: { ...get().productsInSalesByUser, [userId]: products } }),
  getProductsInSalesByUser: () => get().productsInSalesByUser,
  setProductsInSales: (products) => set({ productsInSales: products }),
  getProductsInSales: () => get().productsInSales,
  clearSaleWeek: () => set({ usersInSales: [], productsInSalesByUser: {} })
}));
