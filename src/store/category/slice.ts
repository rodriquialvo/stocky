import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Status, getDefaultStatus } from '../helper/statusStateFactory';
import { Category } from '../../services/categories/dtos/getCategories';

type State = {
  status: Status;
  categories: Category[];
};

const initialState: State = {
  status: getDefaultStatus(),
  categories: []
};

type Action = {
  setStatus: (status: Status) => void;
  setCategories: (data: any) => void;
};

// Create your store, which includes both state and (optionally) actions
export const useCategorytore = create<State & Action>()(
  persist(
    (set, get) => ({
      ...initialState,
      setStatus: (status: Status) => set({ status }),
      setCategories: (data: Category[]) => set({categories: data}),
    }),
    {
      name: 'sales-store', // nombre del key en localStorage
      // puedes incluir otras opciones aquí si lo deseas
    }
  )
);
