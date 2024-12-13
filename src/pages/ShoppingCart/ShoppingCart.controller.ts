import { useEffect, useState } from 'react';
import { useSessionStore } from '../../store/session/slice';
import { CartAction } from '../../store/shoppingcart/actions';
import { useCartStore } from '../../store/shoppingcart/slice';
import { CartController } from './interfaces';

export const useCartController =
  (): /* <--Dependency Injections  like services hooks */
    CartController => {

    const userLogged = useSessionStore(state => state.userLogged);

    const [variantsQuantity, setVariantsQuantity] = useState({});

    const { updateQuantity, removeFromCart, getCart } = CartAction();
    const cart = useCartStore(state => state.cart);

    const handleQuantityChange = (id: string, value: number, productId: string) => {
      if (value < 0) {
        return;
      }
      setVariantsQuantity({ ...variantsQuantity, [id]: value });
      if (value >= 1) {
        onUpdateQuantityPressed(id, value, productId);
      }
    };

    const onUpdateQuantityPressed = async (id: string, value: number, productId: string) => {
      await updateQuantity({
        params: {
          cartId: cart._id,
          variantId: id
        },
        body: {
          quantity: value,
          productId
        }
      })
    };

    const onRemoveFromCartPressed = async (variantId: string) => {
      await removeFromCart(cart._id, variantId)
    };

    useEffect(() => {
      if (userLogged?.id) {
        getCart(userLogged.id);
      }
    }, [])

    useEffect(() => {
      setVariantsQuantity(cart?.items?.reduce((acc, item) => ({ ...acc, [item.variant._id]: item.quantity }), {}))
    }, [cart])


    // Return state and events
    return {
      cart,
      onUpdateQuantityPressed,
      onRemoveFromCartPressed,
      variantsQuantity,
      handleQuantityChange
    };
  };
