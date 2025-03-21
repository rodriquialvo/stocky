import { ApiSalesService } from './api-sales.service';

export interface Sale {
  id: string;
  date: string;
  customer: string;
  product: string;
  quantity: number;
  total: number;
  status: 'completed' | 'pending' | 'cancelled';
}

export interface SalesAnalytics {
  totalSales: number;
  salesGrowth: number;
  averageOrderValue: number;
  averageOrderValueGrowth: number;
  totalOrders: number;
  totalOrdersGrowth: number;
  conversionRate: number;
  conversionRateGrowth: number;
  topProducts: Array<{
    name: string;
    sales: number;
  }>;
  categorySales: Array<{
    name: string;
    sales: number;
  }>;
  dailySales: Array<{
    date: string;
    sales: number;
  }>;
  topSellers: Array<{
    name: string;
    sales: number;
    growth: number;
  }>;
  sales: Sale[];
}

export interface SalesService {
  getSalesAnalytics(month: string): Promise<SalesAnalytics>;
} 