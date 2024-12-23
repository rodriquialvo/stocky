import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  IconButton,
  Button,
  Text,
  Image,
  useMediaQuery,
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { IoFilter } from "react-icons/io5";

import { TabNavProps } from './interfaces';
import FilterPanel from '../FilterPanel/FilterPanel';
import CartPanel from '../CartPanel/CartPanel';
import { useCartStore } from '../../store/shoppingcart/slice';
import { formattedNumberToMoney } from '../../utils/functions';
import { images } from '../../constants/images';
import SearchBar from '../SearchBar/SearchBar';
import { ProductAction } from '../../store/product/actions';
import { useProductStore } from '../../store/product/slice';
import { initialStateFilters } from '../FilterPanel/constants';

const NavigationBar: React.FC<TabNavProps> = ({
}) => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [islopenFilterPanel, setIsOpenFilterPanel] = useState(false);
  const setIsOpenCartPanel = useCartStore(state => state.setIsOpenCartPanel);
  const isOpenCartPanel = useCartStore(state => state.isOpenCartPanel);
  const cart = useCartStore(state => state.cart);
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { getProducts, getProductDetailWhitStockInDropDown, setProductsFiltersAction } = ProductAction()
  const productsFilter = useProductStore(state => state.productsFilters);

  // Función para manejar el scroll y determinar la dirección
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      // Scroll hacia abajo - ocultar navbar
      setShowNavbar(false);
    } else {
      // Scroll hacia arriba - mostrar navbar
      setShowNavbar(true);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const onSearch = (query: string) => {
    setProductsFiltersAction({ ...initialStateFilters, q: query });
  };

  return (
    <Box
      as="nav"
      w="100%"
      bg="white"
      boxShadow="md"
      p={4}

      position="sticky"
      top={showNavbar ? 0 : { base: "-150px", lg: 0 }} // Desaparece al hacer scroll hacia abajo
      transition="top 0.3s ease-in-out"
      zIndex={10}
    >
      <Flex
        maxW="100%"
        mx="auto"
        justify="space-between"
        align="center"
        wrap="wrap"
      // bg={"red"}
      // gap={4}
      >
        {/* Barra de Búsqueda */}
        <Image
          src={images.logo}
          alt="Logo"
          height={"50px"}
          width={"50px"}
          borderRadius={100}
          onClick={() => window.location.href = "/"}
          cursor={"pointer"}
        />
        <SearchBar
          onSearch={onSearch}
        />
        <Flex
          alignItems={"center"}
        >
          <Button
            leftIcon={<IoFilter />}
            colorScheme="pink"
            variant="solid"
            onClick={() => setIsOpenFilterPanel(true)}
          // ml={4}
          >
            {!isMobile && "Filtros"}
          </Button>
          <Flex
            alignItems={"center"}
            flexDirection={{
              base: "column",
              md: "row"
            }}
          >
            <IconButton
              aria-label="Cart"
              icon={<FiShoppingCart />}
              variant="ghost"
              colorScheme="pink"
              fontSize="1.5rem"
              ml={4}
              onClick={() => setIsOpenCartPanel(true)}
            />
            {
              !!cart.items.length &&
              <Text display={{ base: "none", md: "block" }} color={"pink.600"} fontWeight={"bold"}>{formattedNumberToMoney(cart.total_reseller)} | {formattedNumberToMoney(cart.total_retail)}</Text>
            }
          </Flex>
        </Flex>
      </Flex>
      <FilterPanel
        isOpen={islopenFilterPanel}
        onClose={() => setIsOpenFilterPanel(false)}
      />
      <CartPanel
        isOpen={isOpenCartPanel}
        onClose={() => setIsOpenCartPanel(false)}
      />
    </Box>
  );
};

export default NavigationBar;
