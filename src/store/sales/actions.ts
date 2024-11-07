import { UpdateStatusRequestDto } from '../../services/sale/dtos/generic';
import { useAPISaleService } from '../../services/sale/sale.service';
import {
  getErrorStatus,
  getStartStatus,
  getSuccessStatus,
} from '../helper/statusStateFactory';
import { useSaleStore } from './slice';

export const SaleAction = () => {
  const saleService = useAPISaleService();
  const setStatus = useSaleStore(state => state.setStatus);
  const setSales = useSaleStore(state => state.setSales);

  const getSales = async (filter) => {
    setStatus(getStartStatus());
    try {
      const data = await saleService.getSales(filter);
      if (!data.sales) {
        setStatus(getErrorStatus('No response'));
        return;
      }
      setStatus(getSuccessStatus());
      setSales(data);
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  };

  const updateStatusSale = async (saleId: string, item: UpdateStatusRequestDto) => {
    setStatus(getStartStatus());
    try {
      const data = await saleService.updateStatusSale(saleId, item);
      if (!data.sale) {
        setStatus(getErrorStatus('No response'));
        return;
      }
      setStatus(getSuccessStatus());
      getSales({});
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  };


  return {
    getSales,
    updateStatusSale
  };
};
