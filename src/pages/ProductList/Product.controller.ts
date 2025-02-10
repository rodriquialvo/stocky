import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { initialStateFilters } from '../../components/FilterPanel/constants';
import { ItemListProductProps } from '../../components/ItemListProduct/interfaces';
import { ROUTES } from '../../constants/Routes';
import { Product } from '../../services/product/dtos/getProducts';
import { ProductAction } from '../../store/product/actions';
import { useProductStore } from '../../store/product/slice';
import { ProductController } from './interfaces';

export const useProductController =
  (): /* <--Dependency Injections  like services hooks */
    ProductController => {
    const { getProducts, getProductDetailWhitStockInDropDown } = ProductAction()
    const products = useProductStore(state => state.products);
    const { selectProduct, cleanProductsSelected, selectAllProducts, increasePricesOfProducts } = ProductAction();
    const productsSelected = useProductStore(state => state.productsSelected);
    const [isAllproductsSelected, setIsAllProductsSelected] = useState(false)
    const { pathname } = useLocation()
    const [isOpenIncreaseAndDiscountPanel, setIsOpenIncreaseAndDiscountPanel] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const totalProducts = useProductStore(state => state.total);
    const status = useProductStore(state => state.status);
    const isFocused = pathname === ROUTES.STOCK_LIST;
    const { setProductsFiltersAction } = ProductAction();
    const productFilters = useProductStore(state => state.productsFilters);

    useEffect(() => {
      getProducts({ ...productFilters, page: currentPage });
    }, [currentPage, productFilters]);

    useEffect(() => {
      setIsAllProductsSelected(!!productsSelected.length && productsSelected.length === products.length)
    }, [productsSelected, products]);

    useEffect(() => {
      setProductsFiltersAction(initialStateFilters);
      cleanProductsSelected()
    }, [isFocused]);

    const mapProductsViewModel = (product: Product): ItemListProductProps => {
      return {
        fullProduct: product,
        name: product?.name,
        brand: product?.attributes?.brand,
        code: product?.code,
        hasStock: product?.hasStock,
        id: product?.id,
        onClick: () => getProductDetailWhitStockInDropDown(product?.id),
        priceResseller: product?.prices?.reseller,
        priceRetail: product?.prices?.retail,
        onPressCheckbox: () => selectProduct(product),
        isChecked: !!productsSelected.find(prod => prod.id === product.id)
      }
    }

    const onPressedButtonOpenPanelIncreaseAndDiscount = () => {
      setIsOpenIncreaseAndDiscountPanel(true)
    }

    const onClosePanelIncreaseAndDiscount = () => {
      setIsOpenIncreaseAndDiscountPanel(false)
    }

    const onSelectAllProducts = () => {
      if (!!productsSelected.length) {
        cleanProductsSelected();
      } else {
        selectAllProducts()
      }
    }

    return {
      productsViewModel: products.map(mapProductsViewModel),
      isOpenIncreaseAndDiscountPanel,
      onPressedButtonOpenPanelIncreaseAndDiscount,
      onClosePanelIncreaseAndDiscount,
      onSelectAllProducts,
      isAllproductsSelected,
      currentPage,
      totalPages: Math.ceil(totalProducts / 30),
      setCurrentPage,
      isLoading: status.isFetching
    };
  };
