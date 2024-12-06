import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import styles from './Pagination.module.css';
import { PaginationProps } from './interfaces';

//REMOVE
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const previousPage = () => {
    if (currentPage > 0) onPageChange(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };
  return (
    <Box
      px={{ base: "-4", md: "-8" }}
      position="sticky"
      left={0}
      right={0}
      bottom="0"
      backgroundColor="white"
      py="4"
      boxShadow="md"
      zIndex="10"
    >
      <Flex
        direction='row' // Cambia la dirección según el tamaño de la pantalla
        justifyContent="center"
        alignItems="center"
        px={{ base: "2", md: "0" }} // Padding horizontal en móvil
      >
        <Button
          onClick={previousPage}
          isDisabled={currentPage === 1}
          mb={{ base: "2", md: "0" }} // Margen en la parte inferior en móviles
        >
          <Text>Atrás</Text>
        </Button>
        <Text fontWeight="bold" mx="4">
          {currentPage} de {totalPages}
        </Text>
        <Button
          onClick={nextPage}
          isDisabled={currentPage >= totalPages}
          mb={{ base: "2", md: "0" }} // Margen en la parte inferior en móviles
        >
          <Text>Siguiente</Text>
        </Button>
      </Flex>
    </Box>
  );
};

export default Pagination;
