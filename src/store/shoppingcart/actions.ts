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
import { useSessionStore } from '../session/slice';

interface AddComplexWholesaleProductToCartDTO {
  cartId: string;
  productId: string;
  predefinedQuantity: number;
  variants: {
    variantId: string;
    quantity: number;
  }[];
}

export const CartAction = () => {
  const cartService = useAPICartService();
  const setStatus = useCartStore(state => state.setStatus);
  const setCart = useCartStore(state => state.setCart);
  const setAddToCartStatus = useCartStore(state => state.setAddToCartStatus);
  const cart = useCartStore(state => state.cart);
  const sessionId = useSessionStore(state => state.sessionId);

  const createNewCart = async (body: CreateNewCartRequestDto) => {
    setStatus(getStartStatus());
    try {
      // const response = await cartService.postCreateNewCart(body);
      const response = await cartService.postCreateNewCart2({ sessionId });
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
        // const respCart = await cartService.postCreateNewCart({});
        const respCart = await cartService.postCreateNewCart2({ sessionId });
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

  const addToCartWholesale = async (data: AddComplexWholesaleProductToCartDTO) => {
    setStatus(getStartStatus());
    try {
      if (cart._id) {
        data.cartId = cart._id;
      } else {
        const respCart = await cartService.postCreateNewCart2({ sessionId });
        data.cartId = respCart.cart._id;
      }
      const response = await cartService.addComplexWholesaleProduct(data);
      if (!response.cart) {
        setStatus(getErrorStatus('No response'));
        throw new Error('No response from server');
      }
      setStatus(getSuccessStatus());
      setCart(response.cart);
      setAddToCartStatus(getSuccessStatus());
      return response;
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
      throw e;
    }
  }

  return {
    createNewCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCart,
    clearCart,
    addToCartWholesale,
  };
};
