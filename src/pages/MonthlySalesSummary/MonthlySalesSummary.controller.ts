import { useState } from 'react';
import { parseISO } from 'date-fns';
import { SalesAction } from '../../store/sales/actions';
import { useSaleStore } from '../../store/sales/slice';
import { MonthlyStats } from '../../services/sale-analytics/dtos/generic';

export const useMonthlySalesSummaryController = () => {
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats>({
    totalCosts: 0,
    totalSales: 0,
    totalProfit: 0,
    totalTransactions: 0,
    totalProductsSold: 0,
    averageSaleAmount: 0,
    averageProfitPerTransaction: 0,
  });

  const { getMonthlyStats, downloadMonthlyDetail } = SalesAction();
  const isLoading = useSaleStore(state => state.status.isFetching);
  const stats = useSaleStore(state => state.monthlyStats);

  const fetchMonthlySales = async (month: string) => {
    const date = parseISO(month);
    const monthNumber = date.getMonth() + 1; // getMonth() returns 0-11
    const year = date.getFullYear();

    await getMonthlyStats(monthNumber, year);
  };

  const handleDownloadDetail = async (month: string) => {
    try {
      console.log(`Controller: Handling download for month: ${month}`);
      const date = parseISO(month);
      const monthNumber = date.getMonth() + 1;
      const year = date.getFullYear();
      
      console.log(`Controller: Parsed date - month: ${monthNumber}, year: ${year}`);
      await downloadMonthlyDetail(monthNumber, year);
      console.log('Controller: Download completed');
    } catch (error) {
      console.error('Controller: Error in handleDownloadDetail:', error);
    }
  };

  return {
    monthlyStats: stats || monthlyStats,
    isLoading,
    fetchMonthlySales,
    handleDownloadDetail,
  };
}; 