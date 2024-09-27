import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Status, getDefaultStatus } from '../helper/statusStateFactory';
import { User } from '../../services/session/dtos/session.dto';

type State = {
  status: Status;
  userLogged: User;
  isAuthenticated: boolean;
};

const initialState: State = {
  status: getDefaultStatus(),
  userLogged: {
    userId: '',
    userStateId: 0,
    phoneNumber: '',
    email: '',
    identificationNumber: '',
    identificationTypeId: 0,
    name: '',
    lastName: '',
  },
  isAuthenticated: false,
};

type Action = {
  setStatus: (status: Status) => void;
  setUserLogged: (user: User) => void;
  getUserLogged: () => User;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  reset: () => void;
};

// Create your store, which includes both state and (optionally) actions
export const useSessionStore = create<State & Action>()(
  persist(
    (set, get) => ({
      ...initialState,
      setUserLogged: (userLogged: User) => set({ userLogged }),
      getUserLogged: () => get().userLogged,
      setStatus: (status: Status) => set({ status }),
      setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
      reset: () => set({ ...initialState }),
    }),
    {
      name: 'users-store', // nombre del key en localStorage
      // puedes incluir otras opciones aquí si lo deseas
    }
  )
);
