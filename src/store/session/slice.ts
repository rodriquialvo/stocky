import {create} from 'zustand';
import {Status, getDefaultStatus} from '../helper/statusStateFactory';
import { User } from '../../services/session/dtos/session.dto';

type State = {
  status: Status;
  userLogged: User;
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
};

type Action = {
  setStatus: (status: Status) => void;
  setUserLogged: (user: User) => void;
  getUserLogged: () => User;
};

// Create your store, which includes both state and (optionally) actions
export const useUsersStore = create<State & Action>((set, getState) => ({
  ...initialState,
  setUserLogged: (userLogged: User) => set({userLogged}),
  getUserLogged: () => getState().userLogged,
  setStatus: (status: Status) => set(() => ({status})),
}));
