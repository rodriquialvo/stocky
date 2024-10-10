import React from 'react';
import {
  Box,
  Flex,
  Input,
  IconButton,
  Button,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { SearchIcon, HamburgerIcon } from '@chakra-ui/icons';
import { FiShoppingCart } from 'react-icons/fi';
import SearchBarwithSuggestion from '../SearchBarwithSuggestion/SearchBarwithSuggestion';
import { TabNavProps } from './interfaces';

const NavigationBar: React.FC<TabNavProps> = ({
  onClickFilterButton,
}) => {
  return (
    <Box
      as="nav"
      w="100%"
      bg="white"
      boxShadow="md"
      p={4}
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex
        maxW="1200px"
        mx="auto"
        justify="space-between"
        align="center"
        wrap="wrap"
        gap={4}
      >
        {/* Barra de Búsqueda */}
        <SearchBarwithSuggestion />
        {/* Botón para Mostrar Filtros */}
        <Button
          leftIcon={<HamburgerIcon />}
          colorScheme="pink"
          variant="solid"
          onClick={onClickFilterButton}
          ml={4}
        >
          Filters
        </Button>
        {/* Carrito de Compras */}
        <IconButton
          aria-label="Cart"
          icon={<FiShoppingCart />}
          variant="ghost"
          colorScheme="pink"
          fontSize="1.5rem"
          ml={4}
        />


      </Flex>
    </Box>
  );
};

export default NavigationBar;
