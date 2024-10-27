import { useEffect } from 'react';
import {GaleryController} from './interfaces';
import { ProductAction } from '../../store/product/actions';
import { useProductStore } from '../../store/product/slice';
import { Product } from '../../services/product/dtos/getProducts';
import { GalleryItemProps } from '../../components/GalleryItem/GaleryItem';
import { formattedNumberToMoney } from './../../utils/functions';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/Routes';

export const useGaleryController =
  (): /* <--Dependency Injections  like services hooks */
  GaleryController => {
    /* State */
    const {getProducts} = ProductAction()
    const products = useProductStore(state => state.products)
    const navigate = useNavigate();

    /* Listeners */

    useEffect(() => {
      getProducts()
    },[])
    /* View Events */
    const onPressProduct = (product: Product) => {
      navigate(ROUTES.PRODUCT_DETAILS(product.id))
    }

    /* Private Methods */
    const mapProductsViewModel = (product: Product): GalleryItemProps => {
      return {
        availability: product.hasStock,
        images: product.pictures.map(picture => picture.url),
        name: product.name,
        price: formattedNumberToMoney(product?.prices?.retail),
        onClick: () => onPressProduct(product),
        brand: product.attributes.brand
      }
    }

    // Return state and events
    return {
      productsViewModel: products?.map(mapProductsViewModel),
    };
  };
