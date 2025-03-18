import { useEffect } from 'react';
import { GaleryController } from './interfaces';
import { ProductAction } from '../../store/product/actions';
import { useProductStore } from '../../store/product/slice';
import { Product } from '../../services/product/dtos/getProducts';
import { GalleryItemProps } from '../../components/GalleryItem/GaleryItem';
import { formattedNumberToMoney } from './../../utils/functions';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/Routes';
import { initialStateFilters } from '../../components/FilterPanel/constants';

export const useGaleryController =
  (): /* <--Dependency Injections  like services hooks */
    GaleryController => {
    /* State */
    const products = useProductStore(state => state.products)
    const status = useProductStore(state => state.status)
    const navigate = useNavigate();
    const { setProductsFiltersAction } = ProductAction();
    const productFilters = useProductStore(state => state.productsFilters);
    const totalProducts = useProductStore(state => state.total);
    const { getProducts } = ProductAction();
    const { pathname } = useLocation()

    const isFocused = pathname === ROUTES.GALLERY;
    /* Listeners */
    useEffect(() => {
      getProducts(productFilters);
    }, [productFilters]);

    useEffect(() => {
      isFocused && getProducts(initialStateFilters)
    },[isFocused])

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
        brand: product.attributes.brand,
        code: product.code,
        isWholesale: product.wholesaleData.isWholesaler
      }
    }

    const onChangeCurrentPage = (page: number | string) => {
      setProductsFiltersAction({
        ...productFilters,
        page: Number(page)
      }) 
    }

    // Return state and events

    return {
      productsViewModel: products?.map(mapProductsViewModel),
      isLoading: status.isFetching,
      onChangeCurrentPage,
      totalProducts
    };
  };
