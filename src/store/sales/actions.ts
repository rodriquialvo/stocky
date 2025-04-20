import { CreateSaleRequestDto, UpdateStatusRequestDto } from '../../services/sale/dtos/generic';
import { useAPISaleService } from '../../services/sale/sale.service';
import { useAPISaleAnalyticsService } from '../../services/sale-analytics/sale-analytics.service';
import {
  getErrorStatus,
  getStartStatus,
  getSuccessStatus,
} from '../helper/statusStateFactory';
import { ProductAction } from '../product/actions';
import { CartAction } from '../shoppingcart/actions';
import { useCartStore } from '../shoppingcart/slice';
import { useSaleStore } from './slice';

export const SaleAction = () => {
  const saleService = useAPISaleService();
  const setStatus = useSaleStore(state => state.setStatus);
  const setSales = useSaleStore(state => state.setSales);
  const setUsersInSales = useSaleStore(state => state.setUsersInSales);
  const setProductsInSalesByUser = useSaleStore(state => state.setProductsInSalesByUser);
  const setProductsInSales = useSaleStore(state => state.setProductsInSales);
  const clearSaleWeek = useSaleStore(state => state.clearSaleWeek);
  const clearCart = useCartStore(state => state.clearCart)
  const {getProducts} = ProductAction()

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

  const findSellersWithSalesInCurrentWeek = async () => {
    setStatus(getStartStatus());
    try {
      const data = await saleService.findSellersWithSalesInCurrentWeek();
      if (!data.users) {
        setStatus(getErrorStatus('No response'));
        return;
      }
      setStatus(getSuccessStatus());
      setUsersInSales(data.users);
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  }

  const findProductsInSalesByUser = async (userId: string) => {
    setStatus(getStartStatus());
    try {
      const data = await saleService.findProductsInSalesByUser(userId);
      if (!data.products) {
        setStatus(getErrorStatus('No response'));
        return;
      }
      setStatus(getSuccessStatus());
      setProductsInSalesByUser({ userId, products: data.products });
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  }

  const findGroupedProductsInCurrentWeek = async () => {
    setStatus(getStartStatus());
    try {
      const data = await saleService.findGroupedProductsInCurrentWeek();
      if (!data.products) {
        setStatus(getErrorStatus('No response'));
        return;
      }
      setStatus(getSuccessStatus());
      setProductsInSales(data.products);
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  }

  const postSale = async (body: CreateSaleRequestDto) => {
    setStatus(getStartStatus());
    try {
      const data = await saleService.postSale(body);
      if (!data.sale) {
        setStatus(getErrorStatus('No response'));
        return;
      }
      setStatus(getSuccessStatus());
      getSales({});
      clearCart();
      getProducts({});
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  }

  const clearSalesWeek = () => {
    clearSaleWeek();
    findSellersWithSalesInCurrentWeek();
  }

  const clearProductsInSales = () => {
    setProductsInSales({});
    findGroupedProductsInCurrentWeek();
  }

  return {
    getSales,
    updateStatusSale,
    findSellersWithSalesInCurrentWeek,
    findProductsInSalesByUser,
    clearSalesWeek,
    findGroupedProductsInCurrentWeek,
    clearProductsInSales,
    postSale
  };
};

export const SalesAction = () => {
  const salesService = useAPISaleAnalyticsService();
  const setStatus = useSaleStore(state => state.setStatus);
  const setAnalytics = useSaleStore(state => state.setAnalytics);
  const setMonthlyStats = useSaleStore(state => state.setMonthlyStats);

  const getSalesAnalytics = async (month: string) => {
    setStatus(getStartStatus());
    try {
      const data = await salesService.getSalesAnalytics(month);
      setStatus(getSuccessStatus());
      setAnalytics(data);
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  };

  const getMonthlyStats = async (month: number, year: number) => {
    setStatus(getStartStatus());
    try {
      const data = await salesService.getMonthlyStats(month, year);
      setStatus(getSuccessStatus());
      setMonthlyStats(data);
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  };

  const downloadMonthlyDetail = async (month: number, year: number) => {
    setStatus(getStartStatus());
    try {
      const blob = await salesService.downloadMonthlyDetail(month, year);
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `detalle-ventas-${year}-${month}.xlsx`;
      
      document.body.appendChild(a);
      a.click();
      
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 100);
      
      setStatus(getSuccessStatus());
    } catch (e) {
      console.error('Action: Error downloading file:', e);
      setStatus(getErrorStatus(e as Error));
    }
  };

  return {
    getSalesAnalytics,
    getMonthlyStats,
    downloadMonthlyDetail,
  };
};
