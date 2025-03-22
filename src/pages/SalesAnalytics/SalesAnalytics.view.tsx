import React from 'react';
import { Box, Grid, Typography, CircularProgress, Alert } from '@mui/material';
import { useSalesAnalyticsController } from './SalesAnalytics.controller';
import { MonthSelector } from './components/MonthSelector';
import { MetricsCard } from './components/MetricsCard';
import { TopProductsTable } from './components/TopProductsTable';
import { CategorySalesChart } from './components/CategorySalesChart';

export const SalesAnalyticsView: React.FC = () => {
  const { 
    status, 
    analytics, 
    selectedMonth,
    setSelectedMonth,
    months 
  } = useSalesAnalyticsController();

  if (status.isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (status.isError) {
    return (
      <Box p={3}>
        <Alert severity="error">
          {typeof status.error === 'string' ? status.error : 'Error al cargar los datos de ventas'}
        </Alert>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Análisis de Ventas
        </Typography>
        <MonthSelector
          months={months}
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
        />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <MetricsCard
            title="Ventas Totales"
            value={`$${analytics.totalSales.toLocaleString()}`}
            growth={analytics.salesGrowth}
            icon="💰"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MetricsCard
            title="Valor Promedio"
            value={`$${analytics.averageOrderValue.toLocaleString()}`}
            growth={analytics.averageOrderValueGrowth}
            icon="💵"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MetricsCard
            title="Total Órdenes"
            value={analytics.totalOrders.toLocaleString()}
            growth={analytics.totalOrdersGrowth}
            icon="📦"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MetricsCard
            title="Tasa de Conversión"
            value={`${(analytics.conversionRate * 100).toFixed(1)}%`}
            growth={analytics.conversionRateGrowth}
            icon="📈"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TopProductsTable data={analytics.topProducts} />
        </Grid>
        <Grid item xs={12} md={6}>
          <CategorySalesChart data={analytics.categorySales} />
        </Grid>
      </Grid>
    </Box>
  );
}; 