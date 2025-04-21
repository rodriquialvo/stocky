import {
    Box,
    Button,
    Card,
    CardBody,
    Container,
    Flex,
    Heading,
    Select,
    SimpleGrid,
    Stat,
    StatHelpText,
    StatLabel,
    StatNumber,
    useColorModeValue
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';
import { ROUTES } from '../../constants/Routes';
import { useSessionStore } from '../../store/session/slice';
import { useMonthlySalesSummaryController } from './MonthlySalesSummary.controller';
import { DownloadIcon } from '@chakra-ui/icons';

const MonthlySalesSummary: FC = () => {
  const navigate = useNavigate();
  const isAdminUser = useSessionStore(state => state.isAdminUser);
  const { monthlyStats, isLoading, fetchMonthlySales, handleDownloadDetail } = useMonthlySalesSummaryController();
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));

  // Colors for the theme
  const bgColor = useColorModeValue('white', 'gray.800');
  const cardBgColor = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const accentColor = useColorModeValue('blue.500', 'blue.300');

  useEffect(() => {
    if (!isAdminUser) {
      navigate(ROUTES.HOME);
    }
  }, [isAdminUser, navigate]);

  useEffect(() => {
    fetchMonthlySales(selectedMonth);
  }, [selectedMonth]);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={8}>
        <Heading size="lg" mb={4}>Resumen de Ventas Mensual</Heading>
        <Flex align="center" gap={4}>
          <Select 
            value={selectedMonth}
            onChange={handleMonthChange}
            maxW="200px"
          >
            {/* Generate last 12 months options */}
            {Array.from({ length: 12 }, (_, i) => {
              const date = new Date();
              date.setMonth(date.getMonth() - i);
              return (
                <option key={i} value={format(date, 'yyyy-MM')}>
                  {format(date, 'MMMM yyyy', { locale: es })}
                </option>
              );
            })}
          </Select>
          <Button
            leftIcon={<DownloadIcon />}
            colorScheme="blue"
            onClick={() => handleDownloadDetail(selectedMonth)}
            isLoading={isLoading}
          >
            Descargar Detalle
          </Button>
        </Flex>
      </Box>

      {isLoading ? (
        <LoadingOverlay />
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {/* Total Sales Card */}
          <Card bg={cardBgColor} borderRadius="lg" boxShadow="md">
            <CardBody>
              <Stat>
                <StatLabel color="green.500">Total Ventas</StatLabel>
                <StatNumber color="green.400">
                  ${monthlyStats.totalSales.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                </StatNumber>
                <StatHelpText>
                  {monthlyStats.totalTransactions} transacciones
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          {/* Total Costs Card */}
          <Card bg={cardBgColor} borderRadius="lg" boxShadow="md">
            <CardBody>
              <Stat>
                <StatLabel color="red.500">Total Costos</StatLabel>
                <StatNumber color="red.400">
                  ${monthlyStats.totalCosts.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                </StatNumber>
                <StatHelpText>
                  Costo de productos vendidos
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          {/* Total Profit Card */}
          <Card bg={cardBgColor} borderRadius="lg" boxShadow="md">
            <CardBody>
              <Stat>
                <StatLabel color="blue.500">Ganancia Total</StatLabel>
                <StatNumber color="blue.400">
                  ${monthlyStats.totalProfit.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                </StatNumber>
                <StatHelpText>
                  {((monthlyStats.totalProfit / monthlyStats.totalCosts) * 100).toFixed(1)}% margen
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          {/* Products Sold Card */}
          <Card bg={cardBgColor} borderRadius="lg" boxShadow="md">
            <CardBody>
              <Stat>
                <StatLabel color="purple.500">Productos Vendidos</StatLabel>
                <StatNumber color="purple.400">
                  {monthlyStats.totalProductsSold.toLocaleString('es-AR')}
                </StatNumber>
                <StatHelpText>
                  Unidades vendidas
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          {/* Average Sale Card */}
          <Card bg={cardBgColor} borderRadius="lg" boxShadow="md">
            <CardBody>
              <Stat>
                <StatLabel color="orange.500">Promedio por Venta</StatLabel>
                <StatNumber color="orange.400">
                  ${monthlyStats.averageSaleAmount.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                </StatNumber>
                <StatHelpText>
                  Por transacción
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          {/* Average Profit Card */}
          <Card bg={cardBgColor} borderRadius="lg" boxShadow="md">
            <CardBody>
              <Stat>
                <StatLabel color="teal.500">Ganancia Promedio</StatLabel>
                <StatNumber color="teal.400">
                  ${monthlyStats.averageProfitPerTransaction.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                </StatNumber>
                <StatHelpText>
                  Por transacción
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>
      )}
    </Container>
  );
};

export default MonthlySalesSummary; 