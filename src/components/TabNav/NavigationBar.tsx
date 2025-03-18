import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  IconButton,
  Text,
  Image,
  Switch,
  useBreakpointValue,
  Collapse,
  VStack,
  HStack,
  Tooltip,
  Divider,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { FiShoppingCart, FiSearch, FiUser } from 'react-icons/fi';
import { IoFilter } from "react-icons/io5";
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

import { TabNavProps } from './interfaces';
import FilterPanel from '../FilterPanel/FilterPanel';
import CartPanel from '../CartPanel/CartPanel';
import { useCartStore } from '../../store/shoppingcart/slice';
import { images } from '../../constants/images';
import { ProductAction } from '../../store/product/actions';
import { initialStateFilters } from '../FilterPanel/constants';
import MenuPanel from '../MenuPanel/MenuPanel';
import MenuUser from './MenuUser';
import { useProductStore } from '../../store/product/slice';
import { useSessionStore } from '../../store/session/slice';

const NavigationBar: React.FC<TabNavProps> = ({
}) => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpenFilterPanel, setIsOpenFilterPanel] = useState(false);
  const [isOpenMenuPanel, setIsOpenMenuPanel] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const setIsOpenCartPanel = useCartStore(state => state.setIsOpenCartPanel);
  const isOpenCartPanel = useCartStore(state => state.isOpenCartPanel);
  const { setProductsFiltersAction } = ProductAction();
  const productsFilters = useProductStore(state => state.productsFilters);
  const isAdminUser = useSessionStore(state => state.isAdminUser);

  const isMobile = useBreakpointValue({ base: true, md: false });
  const searchBarWidth = useBreakpointValue({ base: "100%", md: "40%" });

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const onSearch = (query: string) => {
    setSearchQuery(query);
    setProductsFiltersAction({ ...initialStateFilters, q: query });
  };

  const onActivateWholesalerProducts = () => {
    setProductsFiltersAction({ ...initialStateFilters, isWholesaler: !productsFilters.isWholesaler });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const NavItems = () => (
    <Flex gap={4} alignItems="center">
      <Tooltip label="Menú principal">
        <IconButton
          aria-label="Menu"
          icon={<HamburgerIcon />}
          variant="ghost"
          onClick={() => setIsOpenMenuPanel(true)}
          bg="transparent"
          color="#ec0868"
          _hover={{ bg: "pink.50" }}
        />
      </Tooltip>
      <Tooltip label="Filtrar productos">
        <IconButton
          aria-label="Filter"
          icon={<IoFilter />}
          variant="ghost"
          onClick={() => setIsOpenFilterPanel(true)}
          bg="transparent"
          color="#ec0868"
          _hover={{ bg: "pink.50" }}
        />
      </Tooltip>
      <Tooltip label="Carrito de compras">
        <IconButton
          aria-label="Cart"
          icon={<FiShoppingCart />}
          variant="ghost"
          color="#ec0868"
          fontSize="1.5rem"
          onClick={() => setIsOpenCartPanel(true)}
          _hover={{ bg: "pink.50" }}
        />
      </Tooltip>
      <MenuUser />
    </Flex>
  );

  const MobileMenuContent = () => (
    <VStack 
      spacing={4} 
      p={4} 
      bg="white" 
      borderTop="1px" 
      borderColor="gray.200"
      w="100%"
      align="stretch"
      maxH="80vh"
      overflowY="auto"
    >
      <Box w="100%">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <FiSearch color="#ec0868" />
          </InputLeftElement>
          <Input
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            borderColor="gray.200"
            _hover={{ borderColor: "pink.200" }}
            _focus={{ borderColor: "#ec0868" }}
          />
        </InputGroup>
      </Box>
      
      <Divider />
      
      <VStack spacing={2} align="stretch">
        <Text fontSize="sm" fontWeight="bold" color="gray.600" px={2}>Navegación</Text>
        <Button
          leftIcon={<FiUser />}
          variant="ghost"
          justifyContent="flex-start"
          onClick={() => setIsOpenMenuPanel(true)}
          color="#ec0868"
          _hover={{ bg: "pink.50" }}
          w="100%"
          p={4}
        >
          Menú principal
        </Button>
      </VStack>

      <Divider />

      <VStack spacing={2} align="stretch">
        <Text fontSize="sm" fontWeight="bold" color="gray.600" px={2}>Filtros y Preferencias</Text>
        <Flex 
          justify="space-between" 
          align="center" 
          w="100%"
          p={2}
          bg="gray.50"
          borderRadius="md"
        >
          <Text fontSize="sm" fontWeight="medium">Ver solo mayoristas</Text>
          <Switch
            size="sm"
            colorScheme="pink"
            id='enable-Wholesaler-mobile'
            onChange={onActivateWholesalerProducts}
            isChecked={productsFilters.isWholesaler}
          />
        </Flex>

        <Button
          leftIcon={<IoFilter />}
          variant="ghost"
          justifyContent="flex-start"
          onClick={() => setIsOpenFilterPanel(true)}
          color="#ec0868"
          _hover={{ bg: "pink.50" }}
          w="100%"
          p={4}
        >
          Filtrar productos
        </Button>
      </VStack>

      <Divider />

      <VStack spacing={2} align="stretch">
        <Text fontSize="sm" fontWeight="bold" color="gray.600" px={2}>Compras</Text>
        <Button
          leftIcon={<FiShoppingCart />}
          variant="ghost"
          justifyContent="flex-start"
          onClick={() => setIsOpenCartPanel(true)}
          color="#ec0868"
          _hover={{ bg: "pink.50" }}
          w="100%"
          p={4}
        >
          Carrito de compras
        </Button>
      </VStack>

      <Divider />

      <VStack spacing={2} align="stretch">
        <Text fontSize="sm" fontWeight="bold" color="gray.600" px={2}>Cuenta</Text>
        <Box>
          <MenuUser />
        </Box>
      </VStack>
    </VStack>
  );

  return (
    <Box
      as="nav"
      w="100%"
      bg="white"
      boxShadow="md"
      p={2}
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex
        maxW="100%"
        mx="auto"
        justify="space-between"
        align="center"
        px={4}
      >
        <Flex align="center" gap={4}>
          <Image
            src={images.logo}
            alt="Logo"
            height="50px"
            width="50px"
            borderRadius="full"
            onClick={() => window.location.href = "/"}
            cursor="pointer"
            transition="transform 0.2s"
            _hover={{ transform: "scale(1.05)" }}
          />
          {!isMobile && (
            <Flex gap={2} alignItems="center">
              <Text fontSize="sm">Ver solo mayoristas</Text>
              <Switch
                size="sm"
                colorScheme="pink"
                id='enable-Wholesaler'
                onChange={onActivateWholesalerProducts}
                isChecked={productsFilters.isWholesaler}
              />
            </Flex>
          )}
        </Flex>

        {!isMobile ? (
          <Flex gap={4} alignItems="center" flex={1} justify="center">
            <InputGroup maxW="400px">
              <InputLeftElement pointerEvents="none">
                <FiSearch color="#ec0868" />
              </InputLeftElement>
              <Input
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                borderColor="gray.200"
                _hover={{ borderColor: "pink.200" }}
                _focus={{ borderColor: "#ec0868" }}
              />
            </InputGroup>
            <NavItems />
          </Flex>
        ) : (
          <Flex gap={2} alignItems="center">
            <IconButton
              aria-label="Menu"
              icon={isMobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
              variant="ghost"
              color="#ec0868"
              onClick={toggleMobileMenu}
              _hover={{ bg: "pink.50" }}
            />
            <IconButton
              aria-label="Cart"
              icon={<FiShoppingCart />}
              variant="ghost"
              color="#ec0868"
              fontSize="1.5rem"
              onClick={() => setIsOpenCartPanel(true)}
              _hover={{ bg: "pink.50" }}
            />
          </Flex>
        )}
      </Flex>

      <Collapse in={isMobileMenuOpen}>
        <MobileMenuContent />
      </Collapse>

      <FilterPanel
        isOpen={isOpenFilterPanel}
        onClose={() => setIsOpenFilterPanel(false)}
      />
      <CartPanel
        isOpen={isOpenCartPanel}
        onClose={() => setIsOpenCartPanel(false)}
      />
      <MenuPanel 
        onClose={() => setIsOpenMenuPanel(false)} 
        isOpen={isOpenMenuPanel} 
      />
    </Box>
  );
};

export default NavigationBar;
