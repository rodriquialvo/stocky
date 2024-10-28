import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GetRolesResponseDto } from '../../services/roles/dtos/generic';
import { Role } from '../../services/session/dtos/session.dto';
import { getDefaultStatus, Status } from '../helper/statusStateFactory';

type State = {
  status: Status;
  roles: Role[]
};

const initialState: State = {
  status: getDefaultStatus(),
  roles: []
};

type Action = {
  setStatus: (status: Status) => void;
  setRoles: (data: GetRolesResponseDto) => void;
};

export const useRoleStore = create<State & Action>()(
  persist(
    (set, get) => ({
      ...initialState,
      setStatus: (status: Status) => set({ status }),
      setRoles: (data: GetRolesResponseDto) => {
        set({ roles: data.roles })
      },
    }),
    {
      name: 'roles-store',
    }
  )
);
