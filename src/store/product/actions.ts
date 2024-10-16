import { useProductStore } from './slice';
import {
  getErrorStatus,
  getStartStatus,
  getSuccessStatus,
} from '../helper/statusStateFactory';
import { useAPIProductService } from '../../services/product/product.service';
import { ProductFormData } from '../../pages/CreateNewProduct/interfaces';
import { Toast } from '@chakra-ui/react';
import { Product } from '../../services/product/dtos/getProducts';

export const ProductAction = () => {
  const productService = useAPIProductService();
  const setStatus = useProductStore(state => state.setStatus);
  const setProducts = useProductStore(state => state.setProducts);
  const setProduct = useProductStore(state => state.setProduct);
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
      console.log("DATA ===>", data);
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  };

  const createNewProduct = async (body: ProductFormData) => {
    setStatus(getStartStatus());
    try {
      const response = await productService.postCreateNewProduct(body);
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
      console.log("ERRORRR ===>", e)
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

  return {
    getProducts,
    createNewProduct,
    getProductDetail
  };
};
