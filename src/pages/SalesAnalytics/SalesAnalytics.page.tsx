import React from 'react';
import {
  Box,
  SimpleGrid,
  Card,
  CardBody,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Select,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { useSalesAnalyticsController } from './SalesAnalytics.controller';
import { ProductsChart } from '../../components/ProductsChart/ProductsChart';
import { DailySalesChart } from './components/DailySalesChart';
import { TopSellersTable } from './components/TopSellersTable';
import { SalesTable } from './components/SalesTable';

const SalesAnalyticsPage: React.FC = () => {
  const controller = useSalesAnalyticsController();

  if (controller.status.isFetching) {
    return <Box>Cargando...</Box>;
  }

  if (controller.status.isError) {
    return <Box>Error al cargar los datos</Box>;
  }

  if (!controller.analytics) {
    return <Box>No hay datos disponibles</Box>;
  }

  return (
    <Box p={6}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
        <Heading size="lg">Análisis de Ventas</Heading>
        <FormControl width="200px">
          <FormLabel>Mes</FormLabel>
          <Select
            value={controller.selectedMonth}
            onChange={(e) => controller.setSelectedMonth(e.target.value)}
          >
            {controller.months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </Select>
        </FormControl>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={6}>
        <Card>
          <CardBody>
            <Stat>
              <StatLabel>Ventas Totales</StatLabel>
              <StatNumber>€{controller.analytics.totalSales.toLocaleString()}</StatNumber>
              <StatHelpText>
                <StatArrow type={controller.analytics.salesGrowth >= 0 ? "increase" : "decrease"} />
                {controller.analytics.salesGrowth}%
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stat>
              <StatLabel>Valor Promedio</StatLabel>
              <StatNumber>€{controller.analytics.averageOrderValue.toLocaleString()}</StatNumber>
              <StatHelpText>
                <StatArrow type={controller.analytics.averageOrderValueGrowth >= 0 ? "increase" : "decrease"} />
                {controller.analytics.averageOrderValueGrowth}%
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stat>
              <StatLabel>Total Órdenes</StatLabel>
              <StatNumber>{controller.analytics.totalOrders.toLocaleString()}</StatNumber>
              <StatHelpText>
                <StatArrow type={controller.analytics.totalOrdersGrowth >= 0 ? "increase" : "decrease"} />
                {controller.analytics.totalOrdersGrowth}%
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stat>
              <StatLabel>Tasa de Conversión</StatLabel>
              <StatNumber>{(controller.analytics.conversionRate * 100).toFixed(1)}%</StatNumber>
              <StatHelpText>
                <StatArrow type={controller.analytics.conversionRateGrowth >= 0 ? "increase" : "decrease"} />
                {controller.analytics.conversionRateGrowth}%
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mb={6}>
        <Card>
          <CardBody>
            <Heading size="md" mb={4}>Ventas Diarias</Heading>
            <Box h="300px">
              <DailySalesChart data={controller.analytics.dailySales} />
            </Box>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Heading size="md" mb={4}>Top Vendedores</Heading>
            <TopSellersTable data={controller.analytics.topSellers} />
          </CardBody>
        </Card>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mb={6}>
        <Card>
          <CardBody>
            <Heading size="md" mb={4}>Productos Más Vendidos</Heading>
            <Box h="300px">
              <ProductsChart data={controller.analytics.topProducts} />
            </Box>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Heading size="md" mb={4}>Ventas por Categoría</Heading>
            <Box h="300px">
              <ProductsChart data={controller.analytics.categorySales} />
            </Box>
          </CardBody>
        </Card>
      </SimpleGrid>

      <Card>
        <CardBody>
          <Heading size="md" mb={4}>Lista de Ventas</Heading>
          <SalesTable data={controller.analytics.sales} />
        </CardBody>
      </Card>
    </Box>
  );
};

export default SalesAnalyticsPage; 