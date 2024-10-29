import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getDefaultStatus, Status } from '../helper/statusStateFactory';

type State = {
  postStockStatus: Status;
  postStockLoading: boolean;
  status: Status;
};

const initialState: State = {
  postStockStatus: getDefaultStatus(),
  postStockLoading: false,
  status: getDefaultStatus(),
};

type Action = {
  setStatus: (status: Status) => void,
  setPostStockStatus: (status: Status) => void,
  setPostStockLoading: (loading: Boolean) => void,
  restoreStatusAndLoading: () => void
};

export const useStockStore = create<State & Action>()(
  persist(
    (set, get) => ({
      ...initialState,
      setStatus: (status: Status) => set({ status }),
      setPostStockStatus: (status: Status) => set({ postStockStatus: status }),
      setPostStockLoading: (loading: boolean) => set({ postStockLoading: loading }),
      restoreStatusAndLoading: () => set({ postStockStatus: getDefaultStatus(), postStockLoading: false }),
    }),
    {
      name: 'stock-store',
    }
  )
);
