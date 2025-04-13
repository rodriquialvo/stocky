import { useCartStore } from './slice';
import {
  getErrorStatus,
  getStartStatus,
  getSuccessStatus,
} from '../helper/statusStateFactory';
import { useAPICartService } from '../../services/shoppingcart/cart.service';
import { Toast } from '@chakra-ui/react';
import { AddToCartRequestDto, Cart, CreateNewCartRequestDto, UpdateQuantityRequestDto } from '../../services/shoppingcart/dtos/generic';
import { sleep } from '../../utils/functions';

export const CartAction = () => {
  const cartService = useAPICartService();
  const setStatus = useCartStore(state => state.setStatus);
  const setCart = useCartStore(state => state.setCart);
  const setAddToCartStatus = useCartStore(state => state.setAddToCartStatus);
  const cart = useCartStore(state => state.cart);


  const createNewCart = async (body: CreateNewCartRequestDto) => {
    setStatus(getStartStatus());
    try {
      const response = await cartService.postCreateNewCart(body);
      if (!response.cart) {
        setStatus(getErrorStatus('No response'));
        return;
      }
      setStatus(getSuccessStatus());
      Toast({
        title: 'Cart added successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  };

  const addToCart = async (item: AddToCartRequestDto) => {
    setStatus(getStartStatus());
    try {
      if (cart._id) {
        item.cartId = cart._id;
      } else {
        const respCart = await cartService.postCreateNewCart({});
        item.cartId = respCart.cart._id;
      }
        const response = await cartService.postAddToCart(item);
      if (!response.cart) {
        setStatus(getErrorStatus('No response'));
        return;
        }
        setStatus(getSuccessStatus());
        setAddToCartStatus(getSuccessStatus());
        setCart(response.cart);
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  };

  const removeFromCart = async (cartId: string, variantId: string, productId: string, isWholesalePackage: boolean) => {
    setStatus(getStartStatus());
    try {
      const response = await cartService.removeFromCart({ cartId, variantId, productId, isWholesalePackage });
      if (!response.cart) {
        setStatus(getErrorStatus('No response'));
        return;
      }
      console.log("RESPONSE EN REMOVE FROM CART", response)
      setStatus(getSuccessStatus());
      setCart(response.cart);
    } catch (e) {
      console.log("ERRORRR EN REMOVE FROM CART", e)
      setStatus(getErrorStatus(e as Error));
    }
  };

  const updateQuantity = async (req: UpdateQuantityRequestDto) => {
    setStatus(getStartStatus());
    try {
      const response = await cartService.updateQuantity(req);
      if (!response.cart) {
        setStatus(getErrorStatus('No response'));
        return;
      }
      setStatus(getSuccessStatus());
      setCart(response.cart);
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  };

  const getCart = async (userId: string) => {
    setStatus(getStartStatus());
    try {
      const response = await cartService.getCart(userId);
      console.log("RESPONSE EN GET CART", response)
      if (!response.cart) {
        setStatus(getErrorStatus('No response'));
        clearCart();
        return;
      }
      setStatus(getSuccessStatus());
      setCart(response.cart);
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  };

  const clearCart = async () => {
    try {
      setCart({ items: [] } as Cart);
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  };

  const addToCartWholesale = async (items: AddToCartRequestDto[]) => {

    setStatus(getStartStatus());
    try {
      for (const item of items) {
        await addToCart(item);
        await sleep(500);
      }
      setStatus(getSuccessStatus());
      console.log("EXITO!!!!!", items)
    } catch (e) {
      console.log("ERRORRR", e)
      setStatus(getErrorStatus(e as Error));
    }
  }

  return {
    createNewCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCart,
    clearCart,
    addToCartWholesale
  };
};
