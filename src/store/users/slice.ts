import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GetResellersResponseDto, Reseller } from '../../services/users/dtos/generic';
import { getDefaultStatus, Status } from '../helper/statusStateFactory';

type State = {
  status: Status;
  resellersList: {
    resellers: Reseller[],
    total: number
  };
};

const initialState: State = {
  status: getDefaultStatus(),
  resellersList: {
    resellers: [],
    total: 0
  }
};

type Action = {
  setStatus: (status: Status) => void;
  setResellersList: (data: GetResellersResponseDto) => void;
};

export const useUserStore = create<State & Action>()(
  persist(
    (set, get) => ({
      ...initialState,
      setStatus: (status: Status) => set({ status }),
      setResellersList: (data: GetResellersResponseDto) => {
        set({ resellersList: { resellers: data.resellers, total: data.total} })
      },
    }),
    {
      name: 'users-store',
    }
  )
);
