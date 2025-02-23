import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  IconButton,
  Text,
  Image,
  Switch,
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { IoFilter } from "react-icons/io5";

import { TabNavProps } from './interfaces';
import FilterPanel from '../FilterPanel/FilterPanel';
import CartPanel from '../CartPanel/CartPanel';
import { useCartStore } from '../../store/shoppingcart/slice';
import { images } from '../../constants/images';
import SearchBar from '../SearchBar/SearchBar';
import { ProductAction } from '../../store/product/actions';
import { initialStateFilters } from '../FilterPanel/constants';
import MenuPanel from '../MenuPanel/MenuPanel';
import { HamburgerIcon } from '@chakra-ui/icons';
import MenuUser from './MenuUser';
import { useProductStore } from '../../store/product/slice';

const NavigationBar: React.FC<TabNavProps> = ({
}) => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [islopenFilterPanel, setIsOpenFilterPanel] = useState(false);
  const [islopenMenuPanel, setIsOpenMenuPanel] = useState(false);
  const setIsOpenCartPanel = useCartStore(state => state.setIsOpenCartPanel);
  const isOpenCartPanel = useCartStore(state => state.isOpenCartPanel);
  const { setProductsFiltersAction } = ProductAction()
  const productsFilters = useProductStore(state => state.productsFilters);
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

  const onActivateWholesalerProducts = () => {
    setProductsFiltersAction({ ...initialStateFilters, isWholesaler: !productsFilters.isWholesaler });
  };

  return (
    <Box
      as="nav"
      w="100%"
      bg="white"
      boxShadow="md"
      p={1}
      pr={4}
      position="sticky"
      top={showNavbar ? 0 : -150} // Desaparece al hacer scroll hacia abajo
      transition="top 0.3s ease-in-out"
      zIndex={10}
    >
      <Flex
        maxW="100%"
        mx="auto"
        justify="space-between"
        align="center"
      >
        <Flex
          align={"center"}
        >
          <Image
            src={images.logo}
            alt="Logo"
            height={"60px"}
            width={"60px"}
            borderRadius={1000}
            onClick={() => window.location.href = "/"}
            // onClick={() => navigate(ROUTES.LOGIN)}
            cursor={"pointer"}
          />
        </Flex>
        <IconButton
          aria-label="Cart"
          icon={<HamburgerIcon />}
          variant="ghost"
          color="#ec0868"
          fontSize="1.5rem"
          // ml={4}
          onClick={() => setIsOpenMenuPanel(true)}
        />
        <Flex gap={2} alignItems={"center"}>
          <Text>Ver solo mayotistas</Text>
          <Switch
            size="md"
            colorScheme="pink"
            id='enable-Wholesaler'
            onChange={onActivateWholesalerProducts}
            isChecked={productsFilters.isWholesaler}
          />
        </Flex>
        <SearchBar
          onSearch={onSearch}
        />
        <Flex>
          <IconButton
            aria-label="Filter"
            icon={<IoFilter />}
            variant="ghost"
            onClick={() => setIsOpenFilterPanel(true)}
            bg="transparent"
            color="#ec0868"
          />
          <IconButton
            aria-label="Cart"
            icon={<FiShoppingCart />}
            variant="ghost"
            color="#ec0868"
            fontSize="1.5rem"
            // ml={4}
            onClick={() => setIsOpenCartPanel(true)}
          />

        </Flex>

        {/* {
              !!cart.items.length &&
              <Text display={{ base: "none", md: "block" }} color={"pink.600"} fontWeight={"bold"}>{formattedNumberToMoney(cart.total_reseller)} | {formattedNumberToMoney(cart.total_retail)}</Text>
            } */}
        <MenuUser />
      </Flex>
      <FilterPanel
        isOpen={islopenFilterPanel}
        onClose={() => setIsOpenFilterPanel(false)}
      />
      <CartPanel
        isOpen={isOpenCartPanel}
        onClose={() => setIsOpenCartPanel(false)}
      />
      <MenuPanel onClose={() => setIsOpenMenuPanel(false)} isOpen={islopenMenuPanel} />
    </Box>
  );
};

export default NavigationBar;
