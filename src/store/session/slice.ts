import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Status, getDefaultStatus } from '../helper/statusStateFactory';
import { ResponseLoginDto, User } from '../../services/session/dtos/session.dto';

type State = {
  status: Status;
  userLogged: User;
  isAuthenticated: boolean;
  basicToken: string;
};

const initialState: State = {
  status: getDefaultStatus(),
  userLogged: {
    id: '',
    name: '',
    lastname: '',
    email: '',
    roles: [],
  },
  basicToken: '',
  isAuthenticated: false,
};

type Action = {
  setStatus: (status: Status) => void;
  setUserLogged: (user: User) => void;
  getUserLogged: () => User;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  reset: () => void;
  setLoginData: (data: ResponseLoginDto) => void;
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
      setLoginData: (data: ResponseLoginDto) => set({ userLogged: data.user, basicToken: data.basicToken }),
    }),
    {
      name: 'users-store', // nombre del key en localStorage
      // puedes incluir otras opciones aquí si lo deseas
    }
  )
);
