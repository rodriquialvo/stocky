import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Badge,
  Text,
} from '@chakra-ui/react';
import { Sale } from '../../../services/sales/sales.service';

interface SalesTableProps {
  data: Sale[];
}

const getStatusColor = (status: Sale['status']) => {
  switch (status) {
    case 'completed':
      return 'green';
    case 'pending':
      return 'yellow';
    case 'cancelled':
      return 'red';
    default:
      return 'gray';
  }
};

const getStatusText = (status: Sale['status']) => {
  switch (status) {
    case 'completed':
      return 'Completada';
    case 'pending':
      return 'Pendiente';
    case 'cancelled':
      return 'Cancelada';
    default:
      return status;
  }
};

export const SalesTable: React.FC<SalesTableProps> = ({ data }) => {
  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Fecha</Th>
            <Th>Cliente</Th>
            <Th>Producto</Th>
            <Th isNumeric>Cantidad</Th>
            <Th isNumeric>Total</Th>
            <Th>Estado</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((sale) => (
            <Tr key={sale.id}>
              <Td>{sale.id}</Td>
              <Td>
                {new Date(sale.date).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </Td>
              <Td>{sale.customer}</Td>
              <Td>{sale.product}</Td>
              <Td isNumeric>{sale.quantity}</Td>
              <Td isNumeric>
                <Text fontWeight="bold">€{sale.total.toLocaleString()}</Text>
              </Td>
              <Td>
                <Badge colorScheme={getStatusColor(sale.status)}>
                  {getStatusText(sale.status)}
                </Badge>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}; 