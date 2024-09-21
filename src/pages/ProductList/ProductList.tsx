import React, { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Flex,
  Button,
  Text,
  useBreakpointValue
} from '@chakra-ui/react';

interface Product {
  name: string;
  description: string;
  brand: string;
  category: string;
  size: string;
  salePrice: number;
  resellerPrice: number;
  costPrice: number;
  saleProfit: number;
  quantity: number;
}

const sampleData: Product[] = [
  // ... (mantenemos los mismos datos de muestra)
];

// Añadimos más datos de muestra para demostrar la paginación
for (let i = 0; i < 43; i++) {
  sampleData.push({
    name: `Product ${i + 4}`,
    description: `Description ${i + 4}`,
    brand: `Brand ${i + 4}`,
    category: `Category ${i % 3}`,
    size: `Size ${i % 5}`,
    salePrice: Math.round(Math.random() * 100 + 10),
    resellerPrice: Math.round(Math.random() * 80 + 10),
    costPrice: Math.round(Math.random() * 50 + 5),
    saleProfit: Math.round(Math.random() * 30 + 5),
    quantity: Math.round(Math.random() * 20),
  });
}

const itemsPerPage = 10;

export const ProductList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  

  const indexOfLastItem = currentPage * itemsPerPage!;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage!;
  const currentItems = sampleData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sampleData.length / itemsPerPage!);

  return (

    <Box display="flex" flexDirection="column" height="100vh" bg="gray.50" p={4} borderRadius="lg">
      {/* <TableContainer> */}
        <Table variant="unstyled">
          <Thead>
            <Tr>
              {Object.keys(sampleData[0]).map((key) => (
                <Th key={key} textAlign="left" pl={4}>
                  {key}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {currentItems.map((product, index) => (
              <Tr key={index}>
                <Td colSpan={Object.keys(product).length} p={2}>
                  <Flex
                    bg={product.quantity < 5 ? 'red.100' : 'white'}
                    py={2}
                    px={3}
                    borderRadius="full"
                    justifyContent="space-between"
                    alignItems="left"
                    boxShadow="sm"
                  >
                    {Object.entries(product).map(([key, value], cellIndex) => (
                      <Box key={key} textAlign="center" flex={1}>
                        {value}
                      </Box>
                    ))}
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      {/* </TableContainer> */}
      
      <Flex justifyContent="center" mt={4}>
        <Button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          isDisabled={currentPage === 1}
        >
          Previous
        </Button>
        <Text mx={4}>
          Page {currentPage} of {totalPages}
        </Text>
        <Button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          isDisabled={currentPage === totalPages}
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
};