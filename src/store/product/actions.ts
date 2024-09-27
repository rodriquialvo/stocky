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

  const getProducts = async () => {
    setStatus(getStartStatus());
    try {
      const products = await productService.getProducts({});
      if (!products) {
        setStatus(getErrorStatus('No response'));
        return;
      }
      setStatus(getSuccessStatus());
      setProducts(products);
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  };

  return {
    getProducts
  };
};
