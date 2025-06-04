import { ApiSalesAnalyticsService } from './api-sales-analytics.service';
import { MonthlyStats, SalesAnalytics } from './dtos/generic';

export interface SaleAnalyticsService {
  getSalesAnalytics(month: string): Promise<SalesAnalytics>;
  getMonthlyStats(month: number, year: number): Promise<MonthlyStats>;
  downloadMonthlyDetail(month: number, year: number): Promise<Blob>;
}

export const useAPISaleAnalyticsService = (): SaleAnalyticsService => {
  return new ApiSalesAnalyticsService();
}; 