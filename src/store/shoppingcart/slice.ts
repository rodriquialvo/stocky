import { create } from 'zustand';
import { Cart } from '../../services/shoppingcart/dtos/generic';
import { getDefaultStatus, Status } from '../helper/statusStateFactory';

type State = {
  status: Status;
  addToCartStatus: Status;
  cart: Cart;
  isOpenCartPanel: boolean;
};

const initialState: State = {
  status: getDefaultStatus(),
  addToCartStatus: getDefaultStatus(),
  cart: {
    items: []
  } as Cart,
  isOpenCartPanel: false
};

type Action = {
  setStatus: (status: Status) => void;
  setCart: (cart: Cart) => void;
  clearCart: () => void;
  setAddToCartStatus: (status: Status) => void;
  setIsOpenCartPanel: (isOpenCartPanel: boolean) => void;
};

export const useCartStore = create<State & Action>()((set) => ({
  ...initialState,
  setStatus: (status: Status) => set({ status }),
  setCart: (cart: Cart) => {
    set({ cart })
  },
  setAddToCartStatus: (addToCartStatus: Status) => set({ addToCartStatus }),
  setIsOpenCartPanel:(bool: boolean) => set({isOpenCartPanel: bool}),
  clearCart: () => set({ cart: { items: [] } as Cart }),
}));
