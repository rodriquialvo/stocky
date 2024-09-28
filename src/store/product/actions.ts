import {useProductStore} from './slice';
import {
  getErrorStatus,
  getStartStatus,
  getSuccessStatus,
} from '../helper/statusStateFactory';
import { useAPIProductService } from '../../services/product/product.service';

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

  return {
    getProducts
  };
};
