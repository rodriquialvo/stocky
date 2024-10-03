import {useProductStore} from './slice';
import {
  getErrorStatus,
  getStartStatus,
  getSuccessStatus,
} from '../helper/statusStateFactory';
import { useAPIProductService } from '../../services/product/product.service';
import { ProductFormData } from '../../pages/CreateNewProduct/interfaces';
import { Toast } from '@chakra-ui/react';

export const ProductAction = () => {
  const productService = useAPIProductService();
  const setStatus = useProductStore(state => state.setStatus);
  const setProducts = useProductStore(state => state.setProducts);

  const getProducts = async (page: number, limit: number) => {
    setStatus(getStartStatus());
    try {
      const data = await productService.getProducts({ page, limit });
      if (!data.products) {
        setStatus(getErrorStatus('No response'));
        return;
      }
      setStatus(getSuccessStatus());
      setProducts(data);
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  };

 const createNewProduct =  async (body: ProductFormData) => {
  setStatus(getStartStatus());
  try {
    const response = await productService.postCreateNewProduct(body);
    if (!response.succes) {
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

  return {
    getProducts,
    createNewProduct
  };
};
