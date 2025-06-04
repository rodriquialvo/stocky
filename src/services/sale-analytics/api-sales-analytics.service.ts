import Http from '../http';
import { MonthlyStats, SalesAnalytics } from './dtos/generic';
import { SaleAnalyticsService } from './sale-analytics.service';

export class ApiSalesAnalyticsService implements SaleAnalyticsService {
  private http: Http;
  
  constructor() {
    this.http = new Http('', 'sales');
  }

  async getSalesAnalytics(month: string): Promise<SalesAnalytics> {
    return this.http.get<SalesAnalytics>('analytics', { month });
  }

  async getMonthlyStats(month: number, year: number): Promise<MonthlyStats> {
    return this.http.get<MonthlyStats>('monthly-stats', { month, year });
  }

  async downloadMonthlyDetail(month: number, year: number): Promise<Blob> {
    console.log(`Service: Downloading monthly detail for month: ${month}, year: ${year}`);
    return this.http.downloadBlob('monthly-detail', { month, year });
  }
} 