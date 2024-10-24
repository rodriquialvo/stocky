import { useNavigate, useParams } from 'react-router-dom';
import {ParamsOnAddToCartPressed, ProductDetailController} from './interfaces';
import { useEffect } from 'react';
import { ProductAction } from '../../store/product/actions';
import { useProductStore } from '../../store/product/slice';
import { CartAction } from '../../store/shoppingcart/actions';
import { useCartStore } from '../../store/shoppingcart/slice';
import { ROUTES } from '../../constants/Routes';
import { getStartStatus } from '../../store/helper/statusStateFactory';

export const useProductDetailController =
  (): /* <--Dependency Injections  like services hooks */
  ProductDetailController => {
    /* State */

    const mapColors = {
      'orange': 'Naranja',
      'red': 'Rojo',
      'blue': 'Azul',
      'yellow': 'Amarillo',
      'green': 'Verde',
      'black': 'Negro',
      'white': 'Blanco',
      'brown': 'Marrón',
      'pink': 'Rosado',
      'purple': 'Morado',
      'gray': 'Gris',
    };

    const { id } = useParams<{ id: string, }>();
  
    const {getProductDetail} = ProductAction()
    // todo: ver si esto esta bien, estoy importand cartAction dentro del product controller
    const { addToCart } = CartAction();
    const addToCartstatus = useCartStore(state => state.addToCartStatus);
    const setAddToCartStatus = useCartStore(state => state.setAddToCartStatus);
    const productDetail = useProductStore(state => state.product);

    const navigate = useNavigate();

    /* Listeners */

    useEffect(() => {
      getProductDetail(id)
    }, [id])

    useEffect(() => {
      if (addToCartstatus.success) {
        navigate(ROUTES.GALLERY);
        setAddToCartStatus(getStartStatus());
      }
    }, [addToCartstatus, navigate])
    
    /* View Events */
    const onAddToCartPressed = ({ size, color, quantity }: ParamsOnAddToCartPressed) => {
      // find stock with size and color
      const stock = productDetail.stocks.find(stock => stock.variant.size === size && stock.variant.color === color);
      console.log('stock', stock);
      addToCart({
        productId: productDetail.id,
        variantId: stock.variant.id,
        quantity: quantity
      })
    };

    /* Private Methods */
    //Ex. const increaseCount = () => {}

    // Return state and events
    return {
      productDetail,
      onAddToCartPressed,
      mapColors
    };
  };
