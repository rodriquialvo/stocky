import { ApiSaleService } from './api-sale.service';
import {  CreateSaleRequestDto, GetSalesFilter, SaleReponseDto, SalesReponseDto, UpdateStatusRequestDto } from './dtos/generic';

export interface SaleService {
  postSale: (body: CreateSaleRequestDto) => Promise<SalesReponseDto>,
  updateStatusSale: (saleId: string, item: UpdateStatusRequestDto) => Promise<SaleReponseDto>,
  getSales: (filter: GetSalesFilter) => Promise<SalesReponseDto>,
  findSellersWithSalesInCurrentWeek: () => Promise<any>,
  findProductsInSalesByUser: (user) => Promise<any>,
  findGroupedProductsInCurrentWeek: () => Promise<any>
}

export const useAPISaleService = (): SaleService => {
  return new ApiSaleService();
};
