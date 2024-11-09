import {
  getErrorStatus,
  getStartStatus,
  getSuccessStatus,
} from '../helper/statusStateFactory';
import { useProductAtributesStore } from './slice';
import { useAPIProductAtributesService } from '../../services/product-atributes/product-atributes.service';

export const ProductAtributesAction = () => {
  const setStatus = useProductAtributesStore(state => state.setStatus);
  const setSizes = useProductAtributesStore(state => state.setSizes);

const productAtributesService = useAPIProductAtributesService()
  const getSizes = async () => {
    setStatus(getStartStatus());
    try {
      const data = await productAtributesService.getProductAtributes({type:"size"});
      if (!data.productAttributes) {
        setStatus(getErrorStatus('No response'));
        return;
      }
      setStatus(getSuccessStatus());
      setSizes(data.productAttributes);
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  };

  return {
    getSizes
  };
};
