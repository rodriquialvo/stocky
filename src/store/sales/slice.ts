import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SalesListDto } from '../../services/sale/dtos/generic';
import { Status, getDefaultStatus } from '../helper/statusStateFactory';

type State = {
  status: Status;
  list: SalesListDto;
};

const initialState: State = {
  status: getDefaultStatus(),
  list: {
    sales: [],
    total: 0
  },
};

type Action = {
  setStatus: (status: Status) => void;
  getSales: (params: {}) => void;
  setSales: (data: any) => void;
};

// Create your store, which includes both state and (optionally) actions
export const useSaleStore = create<State & Action>()(
  persist(
    (set, get) => ({
      ...initialState,
      setStatus: (status: Status) => set({ status }),
      getSales: () => get().list.sales,
      setSales: (data) => set({ list: { sales: data.sales, total: data.total } }),
    }),
    {
      name: 'sales-store', // nombre del key en localStorage
      // puedes incluir otras opciones aquí si lo deseas
    }
  )
);
