import { ApiStockService } from './api-stock.service';
import { PostStockDto, ResponsePostStockDto, ResponsePostStockMultipleDto } from './dtos/generic';

export interface StockService {
  postStock: (data: PostStockDto) => Promise<ResponsePostStockDto>;
  postStockMultiple: (data: PostStockDto[]) => Promise<ResponsePostStockMultipleDto>;
}

export const useAPIStockService = (): StockService => {
  return new ApiStockService();
};
