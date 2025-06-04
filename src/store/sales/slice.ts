import { create } from 'zustand';
import { SalesAnalytics, MonthlyStats } from '../../services/sale-analytics/dtos/generic';
import { SalesListDto } from '../../services/sale/dtos/generic';
import { Status, getDefaultStatus } from '../helper/statusStateFactory';

type State = {
  status: Status;
  analytics: SalesAnalytics | null;
  monthlyStats: MonthlyStats | null;
  selectedMonth: string;
  list: {
    sales: any[];
    total: number;
  };
  usersInSales: any[];
  productsInSalesByUser: Record<string, any>;
  productsInSales: Record<string, any>;
  setStatus: (status: Status) => void;
  setAnalytics: (analytics: SalesAnalytics) => void;
  setMonthlyStats: (stats: MonthlyStats) => void;
  setSelectedMonth: (month: string) => void;
};

const initialState: State = {
  status: getDefaultStatus(),
  analytics: null,
  monthlyStats: null,
  selectedMonth: '',
  list: {
    sales: [],
    total: 0,
  },
  usersInSales: [],
  productsInSalesByUser: {},
  productsInSales: {},
  setStatus: () => {},
  setAnalytics: () => {},
  setMonthlyStats: () => {},
  setSelectedMonth: () => {},
};

type Action = {
  setSales: (data: SalesListDto) => void;
  setUsersInSales: (users: any[]) => void;
  setProductsInSalesByUser: (data: { userId: string; products: any[] }) => void;
  setProductsInSales: (products: any) => void;
  clearSaleWeek: () => void;
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
  clearSaleWeek: () => set({ usersInSales: [], productsInSalesByUser: {} }),
  setAnalytics: (data) => set({ analytics: data }),
  setMonthlyStats: (stats) => set({ monthlyStats: stats }),
  setSelectedMonth: (month) => set({ selectedMonth: month })
}));
