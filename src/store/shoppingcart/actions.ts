import { useCartStore } from './slice';
import {
  getErrorStatus,
  getStartStatus,
  getSuccessStatus,
} from '../helper/statusStateFactory';
import { useAPICartService } from '../../services/shoppingcart/cart.service';
import { Toast } from '@chakra-ui/react';
import { AddToCartRequestDto, CreateNewCartRequestDto, UpdateQuantityRequestDto } from '../../services/shoppingcart/dtos/generic';

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
      console.log('cart', cart);
      if (cart._id) {
        item.cartId = cart._id;
      } else {
        const respCart = await cartService.postCreateNewCart({});
        item.cartId = respCart.cart._id;
      }
      console.log('item', item);
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

  const removeFromCart = async (cartId: string, variantId: string) => {
    setStatus(getStartStatus());
    try {
      const response = await cartService.removeFromCart({ cartId, variantId });
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
      if (!response.cart) {
        setStatus(getErrorStatus('No response'));
        return;
      }
      console.log(response.cart);
      setStatus(getSuccessStatus());
      setCart(response.cart);
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  };

  return {
    createNewCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCart
  };
};
