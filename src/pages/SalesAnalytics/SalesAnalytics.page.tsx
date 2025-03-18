import React from 'react';
import {
  Box,
  Container,
  Grid,
  Select,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  SimpleGrid,
  Card,
  CardBody,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import { useSalesAnalyticsController } from './SalesAnalytics.controller';
import { SalesChart } from '../../components/SalesChart/SalesChart';
import { TopSellersChart } from '../../components/TopSellersChart/TopSellersChart';
import { ProductsChart } from '../../components/ProductsChart/ProductsChart';

const SalesAnalyticsPage: React.FC = () => {
  const controller = useSalesAnalyticsController();
  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  return (
    <Container maxW="8xl" py={8}>
      <Box mb={8}>
        <Heading size="lg" mb={4}>Análisis de Ventas</Heading>
        <Select
          value={controller.selectedMonth}
          onChange={(e) => controller.setSelectedMonth(e.target.value)}
          maxW="300px"
          mb={6}
        >
          {controller.months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </Select>

        {/* KPIs */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
          <Card bg={cardBg}>
            <CardBody>
              <Stat>
                <StatLabel>Ventas Totales</StatLabel>
                <StatNumber>€{controller.metrics.totalSales}</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  {controller.metrics.salesGrowth}%
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card bg={cardBg}>
            <CardBody>
              <Stat>
                <StatLabel>Productos Vendidos</StatLabel>
                <StatNumber>{controller.metrics.totalProducts}</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  {controller.metrics.productsGrowth}%
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card bg={cardBg}>
            <CardBody>
              <Stat>
                <StatLabel>Revendedores Activos</StatLabel>
                <StatNumber>{controller.metrics.activeResellers}</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  {controller.metrics.resellersGrowth}%
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card bg={cardBg}>
            <CardBody>
              <Stat>
                <StatLabel>Ticket Promedio</StatLabel>
                <StatNumber>€{controller.metrics.averageTicket}</StatNumber>
                <StatHelpText>
                  <StatArrow type="decrease" />
                  {controller.metrics.ticketGrowth}%
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Gráficos */}
        <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
          <Card bg={cardBg}>
            <CardBody>
              <Heading size="md" mb={4}>Ventas Diarias</Heading>
              <Box h="400px">
                <SalesChart data={controller.dailySalesData} />
              </Box>
            </CardBody>
          </Card>

          <Card bg={cardBg}>
            <CardBody>
              <Heading size="md" mb={4}>Top Revendedores</Heading>
              <Box h="400px">
                <TopSellersChart data={controller.topSellersData} />
              </Box>
            </CardBody>
          </Card>
        </Grid>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mt={6}>
          <Card bg={cardBg}>
            <CardBody>
              <Heading size="md" mb={4}>Productos Más Vendidos</Heading>
              <Box h="300px">
                <ProductsChart data={controller.topProductsData} />
              </Box>
            </CardBody>
          </Card>

          <Card bg={cardBg}>
            <CardBody>
              <Heading size="md" mb={4}>Distribución de Ventas por Categoría</Heading>
              <Box h="300px">
                <ProductsChart data={controller.categorySalesData} />
              </Box>
            </CardBody>
          </Card>
        </SimpleGrid>
      </Box>
    </Container>
  );
};

export default SalesAnalyticsPage; 