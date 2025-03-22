import { create } from 'zustand';
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

export const useStockStore = create<State & Action>()((set, get) => ({
  ...initialState,
  setStatus: (status: Status) => set({ status }),
  setPostStockStatus: (status: Status) => set({ postStockStatus: status }),
  setPostStockLoading: (loading: boolean) => set({ postStockLoading: loading }),
  restoreStatusAndLoading: () => set({ postStockStatus: getDefaultStatus(), postStockLoading: false }),
}));
