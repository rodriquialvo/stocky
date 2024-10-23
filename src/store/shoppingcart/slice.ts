import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cart } from '../../services/shoppingcart/dtos/generic';
import { getDefaultStatus, Status } from '../helper/statusStateFactory';

type State = {
  status: Status;
  addToCartStatus: Status;
  cart: Cart;
};

const initialState: State = {
  status: getDefaultStatus(),
  addToCartStatus: getDefaultStatus(),
  cart: {
    items: []
  } as Cart,
};

type Action = {
  setStatus: (status: Status) => void;
  setCart: (cart: Cart) => void;
  setAddToCartStatus: (status: Status) => void;
};

export const useCartStore = create<State & Action>()(
  persist(
    (set, get) => ({
      ...initialState,
      setStatus: (status: Status) => set({ status }),
      setCart: (cart: Cart) => {
        console.log('cartZustand', cart);
        set({ cart })
      },
      setAddToCartStatus: (addToCartStatus: Status) => set({ addToCartStatus }),
    }),
    {
      name: 'cart-store',
    }
  )
);
