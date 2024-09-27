import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Status, getDefaultStatus } from '../helper/statusStateFactory';

type State = {
  status: Status;
  products: any[];
};

const initialState: State = {
  status: getDefaultStatus(),
  products: [],
};

type Action = {
  setStatus: (status: Status) => void;
  getProducts: (params: {}) => void;
  setProducts: (products: any[]) => void;
};

// Create your store, which includes both state and (optionally) actions
export const useProductStore = create<State & Action>()(
  persist(
    (set, get) => ({
      ...initialState,
      setStatus: (status: Status) => set({ status }),
      getProducts: () => get().products,
      setProducts: (products: any[]) => set({ products }),
    }),
    {
      name: 'products-store', // nombre del key en localStorage
      // puedes incluir otras opciones aquí si lo deseas
    }
  )
);
