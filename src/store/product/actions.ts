import { useProductStore } from './slice';
import {
  getErrorStatus,
  getStartStatus,
  getSuccessStatus,
} from '../helper/statusStateFactory';
import { useAPIProductService } from '../../services/product/product.service';
import { ProductFormData } from '../../pages/CreateNewProduct/interfaces';
import { Toast } from '@chakra-ui/react';
import { ImageAction } from '../image/actions';

export const ProductAction = () => {
  const productService = useAPIProductService();
  const setStatus = useProductStore(state => state.setStatus);
  const setProducts = useProductStore(state => state.setProducts);
  const setProduct = useProductStore(state => state.setProduct);
  const setProductsWhitStocks = useProductStore(state => state.setProductsWhitStocks);
  const productsWhitStocks = useProductStore(state => state.productsWhitStocks);
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
      const response = await productService.getProductDetail(id);
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
            const response = await productService.getProductDetailWithStocks(id);
            if (!response.product) {
              setStatus(getErrorStatus('No response'));
              return;
            }
            setProductsWhitStocks({ ...productsWhitStocks, [id]: { ...response.product, lastRequest: new Date() } });
          }
        }
      } else {
        const response = await productService.getProductDetailWithStocks(id);
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

  return {
    getProducts,
    createNewProduct,
    getProductDetail,
    getProductDetailWhitStockInDropDown
  };
};
