import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  IconButton,
  Button,
  Text,
  Image,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { FiShoppingCart } from 'react-icons/fi';
import SearchBarwithSuggestion from '../SearchBarwithSuggestion/SearchBarwithSuggestion';
import { TabNavProps } from './interfaces';
import FilterPanel from '../FilterPanel/FilterPanel';
import CartPanel from '../CartPanel/CartPanel';
import { useCartStore } from '../../store/shoppingcart/slice';
import { formattedNumberToMoney } from '../../utils/functions';
import { images } from '../../constants/images';

const NavigationBar: React.FC<TabNavProps> = ({
}) => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [islopenFilterPanel, setIsOpenFilterPanel] = useState(false);
  const setIsOpenCartPanel = useCartStore(state => state.setIsOpenCartPanel);
  const isOpenCartPanel = useCartStore(state => state.isOpenCartPanel);
  const cart = useCartStore(state => state.cart);
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
        maxW="1200px"
        mx="auto"
        justify="space-between"
        align="center"
        wrap="wrap"
        gap={4}
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
        <SearchBarwithSuggestion />
        {/* Botón para Mostrar Filtros */}
        <Button
          leftIcon={<HamburgerIcon />}
          colorScheme="pink"
          variant="solid"
          onClick={() => setIsOpenFilterPanel(true)}
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
          onClick={() => setIsOpenCartPanel(true)}
        />
        <Text color={"pink.600"} fontWeight={"bold"}>{formattedNumberToMoney(cart.total_reseller)} | {formattedNumberToMoney(cart.total_retail)}</Text>
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
