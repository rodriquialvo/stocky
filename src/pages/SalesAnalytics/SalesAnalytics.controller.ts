import { useState } from 'react';

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

interface Month {
  value: string;
  label: string;
}

export const useSalesAnalyticsController = () => {
  const [selectedMonth, setSelectedMonth] = useState('2024-03');

  const months: Month[] = [
    { value: '2024-03', label: 'Marzo 2024' },
    { value: '2024-02', label: 'Febrero 2024' },
    { value: '2024-01', label: 'Enero 2024' },
    { value: '2023-12', label: 'Diciembre 2023' },
  ];

  const metrics: Metrics = {
    totalSales: 45678,
    salesGrowth: 23.5,
    totalProducts: 1234,
    productsGrowth: 15.8,
    activeResellers: 45,
    resellersGrowth: 12.3,
    averageTicket: 89.99,
    ticketGrowth: -2.5,
  };

  const dailySalesData = [
    { date: '2024-03-01', sales: 1500 },
    { date: '2024-03-02', sales: 1800 },
    { date: '2024-03-03', sales: 1200 },
    { date: '2024-03-04', sales: 2200 },
    { date: '2024-03-05', sales: 1900 },
    { date: '2024-03-06', sales: 2100 },
    { date: '2024-03-07', sales: 2400 },
  ];

  const topSellersData = [
    { name: 'María García', sales: 12500 },
    { name: 'Juan Pérez', sales: 10800 },
    { name: 'Ana Martínez', sales: 9200 },
    { name: 'Carlos López', sales: 8500 },
    { name: 'Laura Torres', sales: 7900 },
  ];

  const topProductsData = [
    { name: 'Camiseta Básica', sales: 450 },
    { name: 'Pantalón Vaquero', sales: 380 },
    { name: 'Vestido Floral', sales: 320 },
    { name: 'Sudadera', sales: 290 },
    { name: 'Zapatillas', sales: 250 },
  ];

  const categorySalesData = [
    { name: 'Ropa', sales: 25000 },
    { name: 'Calzado', sales: 15000 },
    { name: 'Accesorios', sales: 8000 },
    { name: 'Deportivo', sales: 12000 },
    { name: 'Otros', sales: 5000 },
  ];

  return {
    selectedMonth,
    setSelectedMonth,
    months,
    metrics,
    dailySalesData,
    topSellersData,
    topProductsData,
    categorySalesData,
  };
}; 