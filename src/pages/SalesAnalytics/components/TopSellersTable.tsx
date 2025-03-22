import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from '@chakra-ui/react';

interface TopSellersTableProps {
  data: Array<{
    name: string;
    sales: number;
    growth: number;
  }>;
}

export const TopSellersTable: React.FC<TopSellersTableProps> = ({ data }) => {
  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Vendedor</Th>
            <Th isNumeric>Ventas</Th>
            <Th isNumeric>Crecimiento</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((seller, index) => (
            <Tr key={index}>
              <Td>{seller.name}</Td>
              <Td isNumeric>
                <Stat>
                  <StatNumber>€{seller.sales.toLocaleString()}</StatNumber>
                  <StatHelpText>
                    <StatArrow type={seller.growth >= 0 ? "increase" : "decrease"} />
                    {Math.abs(seller.growth)}%
                  </StatHelpText>
                </Stat>
              </Td>
              <Td isNumeric>
                <Text color={seller.growth >= 0 ? "green.500" : "red.500"}>
                  {seller.growth >= 0 ? '+' : ''}{seller.growth}%
                </Text>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}; 