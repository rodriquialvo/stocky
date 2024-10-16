import { useParams } from 'react-router-dom';
import {ProductDetailController} from './interfaces';
import { useEffect } from 'react';
import { ProductAction } from '../../store/product/actions';
import { useProductStore } from '../../store/product/slice';

export const useProductDetailController =
  (): /* <--Dependency Injections  like services hooks */
  ProductDetailController => {
    /* State */
    const { id } = useParams<{ id: string, }>();
    const {getProductDetail} = ProductAction()
    const productDetail = useProductStore(state => state.product)

    /* Listeners */

    useEffect(() => {
      getProductDetail(id)
    }, [id])
    
    /* View Events */
    const onExamplePressed = () => {};

    /* Private Methods */
    //Ex. const increaseCount = () => {}

    // Return state and events
    return {
      productDetail
    };
  };
