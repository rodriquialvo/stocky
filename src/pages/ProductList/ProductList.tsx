import React, { useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button, Stack, useBreakpointValue } from '@chakra-ui/react';

const data = [
  { name: 'Producto 1', description: 'Descripción 1', brand: 'Marca A', category: 'Categoría 1', size: 'M', total: 10 },
  { name: 'Producto 2', description: 'Descripción 2', brand: 'Marca B', category: 'Categoría 2', size: 'L', total: 20 },
  { name: 'Producto 3', description: 'Descripción 3', brand: 'Marca C', category: 'Categoría 3', size: 'S', total: 15 },
  { name: 'Producto 4', description: 'Descripción 4', brand: 'Marca D', category: 'Categoría 4', size: 'XL', total: 25 },
  { name: 'Producto 5', description: 'Descripción 5', brand: 'Marca E', category: 'Categoría 5', size: 'XS', total: 30 },
  // Añade más productos para simular más filas
];

export const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Cambia el número de filas por página según el tamaño de la pantalla
  const itemsPerPage = useBreakpointValue({ base: 2, md: 4, lg: 6 });

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Box w="100%" overflowX="auto">
      <Table variant="striped" size="sm">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Brand</Th>
            <Th>Category</Th>
            <Th>Size</Th>
            <Th>Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentData.map((item, index) => (
            <Tr key={index}>
              <Td>{item.name}</Td>
              <Td>{item.description}</Td>
              <Td>{item.brand}</Td>
              <Td>{item.category}</Td>
              <Td>{item.size}</Td>
              <Td>{item.total}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Paginación */}
      <Stack direction="row" spacing={4} justify="center" mt={4}>
        <Button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          size="sm"
          colorScheme="blue"
        >
          Previous
        </Button>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          size="sm"
          colorScheme="blue"
        >
          Next
        </Button>
      </Stack>
    </Box>
  );
};