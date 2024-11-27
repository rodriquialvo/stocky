import { PostStockDto } from '../../services/stock/dtos/generic';
import { useAPIStockService } from '../../services/stock/stock.service';
import {
  getErrorStatus,
  getStartStatus,
  getSuccessStatus,
} from '../helper/statusStateFactory';
import { useStockStore } from './slice';

export const StockAction = () => {
  const stockService = useAPIStockService();
  const setStatus = useStockStore(state => state.setStatus);
  const setPostStockStatus = useStockStore(state => state.setPostStockStatus);
  const setPostStockLoading = useStockStore(state => state.setPostStockLoading);


  const postStock = async (data: PostStockDto) => {
    setPostStockStatus(getStartStatus());
    setPostStockLoading(true);

    try {
      const response = await stockService.postStock(data);
      if (!response.stock) {
        setPostStockStatus(getErrorStatus());
        setPostStockLoading(false);
        return;
      }

      setPostStockStatus(getSuccessStatus());
      setPostStockLoading(false);
    } catch (e) {
      setPostStockStatus(getErrorStatus(e as Error));
      setPostStockLoading(false);
    }
  }

  const postStockMultiple = async (data: PostStockDto[]) => {
    setPostStockStatus(getStartStatus());
    setPostStockLoading(true);
    try {
      const response = await stockService.postStockMultiple(data);
      if (!response.stocks) {
        setPostStockStatus(getErrorStatus());
        setPostStockLoading(false);
        return;
      }

      setPostStockStatus(getSuccessStatus());
      setPostStockLoading(false);
    } catch (e) {
      setPostStockStatus(getErrorStatus(e as Error));
      setPostStockLoading(false);
    }
  }

  return {
    postStock,
    postStockMultiple
  };
};
