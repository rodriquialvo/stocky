import { useEffect } from 'react';
import { SaleAnalyticsService } from '../../services/sale-analytics/sale-analytics.service';
import { ApiSalesAnalyticsService } from '../../services/sale-analytics/api-sales-analytics.service';
import { getStartStatus, getSuccessStatus, getErrorStatus } from '../../store/helper/statusStateFactory';
import { useSaleStore } from '../../store/sales/slice';

const salesService: SaleAnalyticsService = new ApiSalesAnalyticsService();

interface Metrics {
  totalSales: number;
  salesGrowth: number;
  totalProducts: number;
  productsGrowth: number;
  activeResellers: number;
  resellersGrowth: number;
  averageTicket: number;
  ticketGrowth: number;
}

export interface Month {
  value: string;
  label: string;
}

const generateMonths = (count: number = 12): Month[] => {
  const months = [];
  const currentDate = new Date();
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  for (let i = 0; i < count; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const monthValue = date.toISOString().slice(0, 7); // Formato YYYY-MM
    const monthLabel = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    months.push({ value: monthValue, label: monthLabel });
  }

  return months;
};

export const useSalesAnalyticsController = () => {
  const { 
    status, 
    analytics, 
    selectedMonth,
    setSelectedMonth,
    setAnalytics,
    setStatus 
  } = useSaleStore();

  const months = generateMonths(24); // Generar 24 meses (2 años)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setStatus(getStartStatus());
        const data = await salesService.getSalesAnalytics(selectedMonth);
        setAnalytics(data);
        setStatus(getSuccessStatus());
      } catch (error) {
        console.error('Error fetching sales analytics:', error);
        setStatus(getErrorStatus(error as Error));
      }
    };

    fetchAnalytics();
  }, [selectedMonth, setAnalytics, setStatus]);

  return {
    status,
    analytics,
    selectedMonth,
    setSelectedMonth,
    months
  };
}; 