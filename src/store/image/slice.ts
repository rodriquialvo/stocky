import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Status, getDefaultStatus } from '../helper/statusStateFactory';

type State = {
  status: Status;
};

const initialState: State = {
  status: getDefaultStatus(),
};

type Action = {
  setStatus: (status: Status) => void;
};

// Create your store, which includes both state and (optionally) actions
export const useImageStore = create<State & Action>()(
  persist(
    (set, get) => ({
      ...initialState,
      setStatus: (status: Status) => set({ status }),
    }),
    {
      name: 'images-store', // nombre del key en localStorage
      // puedes incluir otras opciones aquí si lo deseas
    }
  )
);
