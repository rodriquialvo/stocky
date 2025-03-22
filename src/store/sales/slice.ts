import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SalesAnalytics } from '../../services/sales/sales.service';
import { getDefaultStatus, Status } from '../helper/statusStateFactory';

type State = {
  status: Status;
  analytics: SalesAnalytics | null;
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
  setSelectedMonth: (month: string) => void;
};

const initialState: State = {
  status: getDefaultStatus(),
  analytics: null,
  selectedMonth: new Date().toISOString().slice(0, 7), // Formato YYYY-MM
  list: {
    sales: [],
    total: 0
  },
  usersInSales: [],
  productsInSalesByUser: {},
  productsInSales: {},
  setStatus: () => {},
  setAnalytics: () => {},
  setSelectedMonth: () => {}
};

type Action = {
  setSales: (data: any) => void;
  setUsersInSales: (users: any[]) => void;
  setProductsInSalesByUser: (data: { userId: string; products: any[] }) => void;
  setProductsInSales: (products: Record<string, any>) => void;
  clearSaleWeek: () => void;
};

const store = create<State & Action>()(
  persist(
    (set) => ({
      ...initialState,
      setStatus: (status) => set({ status }),
      setAnalytics: (data) => set({ analytics: data }),
      setSales: (data) => set({ list: { sales: data.sales, total: data.total } }),
      setUsersInSales: (users) => set({ usersInSales: users }),
      setProductsInSalesByUser: ({ userId, products }) => 
        set((state) => ({ 
          productsInSalesByUser: { ...state.productsInSalesByUser, [userId]: products } 
        })),
      setProductsInSales: (products) => set({ productsInSales: products }),
      clearSaleWeek: () => set({ usersInSales: [], productsInSalesByUser: {} }),
      setSelectedMonth: (month) => set({ selectedMonth: month })
    }),
    {
      name: 'sales-store',
    },
  ),
);

// Exportamos ambos nombres para mantener compatibilidad
export const useSalesStore = store;
export const useSaleStore = store;
