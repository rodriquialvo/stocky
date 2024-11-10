import { Toast } from '@chakra-ui/react';
import { ProductFormData } from '../../pages/CreateNewProduct/interfaces';
import { useAPIProductService } from '../../services/product/product.service';
import {
  getErrorStatus,
  getStartStatus,
  getSuccessStatus,
} from '../helper/statusStateFactory';
import { ImageAction } from '../image/actions';
import { useProductStore } from './slice';
import { Product } from '../../services/product/dtos/getProducts';

export const ProductAction = () => {
  const productService = useAPIProductService();
  const setStatus = useProductStore(state => state.setStatus);
  const setProducts = useProductStore(state => state.setProducts);
  const setProduct = useProductStore(state => state.setProduct);
  const setProductsWhitStocks = useProductStore(state => state.setProductsWhitStocks);
  const setProductsByCodeOrName = useProductStore(state => state.setProductsByCodeOrName);
  const setProductsSelected = useProductStore(state => state.setProductsSelected);
  const productsSelected = useProductStore(state => state.productsSelected)
  const productsWhitStocks = useProductStore(state => state.productsWhitStocks);
  const products = useProductStore(state => state.products);

  const { createNewImageUrl } = ImageAction()
  const getProducts = async () => {
    setStatus(getStartStatus());
    try {
      const data = await productService.getProducts();
      if (!data.products) {
        setStatus(getErrorStatus('No response'));
        return;
      }
      setStatus(getSuccessStatus());
      setProducts(data.products);
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  };

  const createNewProduct = async (body: ProductFormData) => {
    setStatus(getStartStatus());
    try {

      const uploadedUrls = await Promise.all(
        body.pictures.map(element => createNewImageUrl(element))
    );

      const response = await productService.postCreateNewProduct({ ...body, pictures: uploadedUrls.map(url => ({ url, alt_text: body.name + " " + body.code })) });
      if (!response.product) {
        setStatus(getErrorStatus('No response'));
        return;
      }
      setStatus(getSuccessStatus());
      Toast({
        title: 'Product added successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  };

  const getProductDetail = async (id: string) => {
    setStatus(getStartStatus());
    try {
      const response = await productService.getProductDetail(id,{ by: "variant"} );
      if (!response.product) {
        setStatus(getErrorStatus('No response'));
        return;
      }
      setStatus(getSuccessStatus());
      setProduct(response.product);
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  };

  const getProductDetailWhitStockInDropDown = async (id: string) => {
    setStatus(getStartStatus());
    try {
      setStatus(getSuccessStatus());
      if (productsWhitStocks[id]) {
        if (productsWhitStocks[id].lastRequest) {
          const fiveMinutesInMs = 5 * 60 * 1000;
          const now = new Date();
          if ((now as any) - (productsWhitStocks[id].lastRequest as any) > fiveMinutesInMs) {
            const response = await productService.getProductDetail(id);
            if (!response.product) {
              setStatus(getErrorStatus('No response'));
              return;
            }
            setProductsWhitStocks({ ...productsWhitStocks, [id]: { ...response.product, lastRequest: new Date() } });
          }
        }
      } else {
        const response = await productService.getProductDetail(id);
        if (!response.product) {
          setStatus(getErrorStatus('No response'));
          return;
        }
        setProductsWhitStocks({ ...productsWhitStocks, [id]: { ...response.product, lastRequest: new Date() } });
      }
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  }

  const getProductsByCodeOrName = async (q: string) => {
    setStatus(getStartStatus());
    try {
      const response = await productService.getProductsByCodeOrName(q);
      if (!response.products) {
        setStatus(getErrorStatus('No response'));
        return;
      }
      setStatus(getSuccessStatus());
      setProductsByCodeOrName(response.products);
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  };

  const selectProduct = async (product: Product) => {
    setStatus(getStartStatus());
    try{
      if(!!productsSelected.find(prod => product.id === prod.id)){
        setProductsSelected(productsSelected.filter(prod => prod.id !== product.id ))
      } else {
        setProductsSelected([...productsSelected, product])
      }
    } catch (e) {
    }
  }

  const cleanProductsSelected = () => {
    setProductsSelected([]);
  }

  const selectAllProducts = () => {
    setProductsSelected(products)
  }


  return {
    getProducts,
    createNewProduct,
    getProductDetail,
    getProductDetailWhitStockInDropDown,
    getProductsByCodeOrName,
    selectProduct,
    cleanProductsSelected,
    selectAllProducts
  };
};
