import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  ChakraProvider,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';
import { SaleAction } from '../../store/sales/actions';
import { useSaleStore } from '../../store/sales/slice';
import { capitalizeFirstLetter, formattedNumberToMoney } from '../../utils/functions';
import { formatDateYearMonthDay } from '../../utils/date';

interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface Seller {
  id: number;
  name: string;
  products: Product[];
}

// const ITEMS_PER_PAGE_PRODUCTS = 2;

// Componente para paginación
const Pagination = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}) => (
  <Center mt={4}>
    <Button
      onClick={onPrevious}
      disabled={currentPage === 1}
      mr={2}
      colorScheme="teal"
      variant="outline"
    >
      Anterior
    </Button>
    <Text fontWeight="bold" mx={4}>
      Página {currentPage} de {totalPages}
    </Text>
    <Button
      onClick={onNext}
      disabled={currentPage === totalPages}
      colorScheme="teal"
      variant="outline"
    >
      Siguiente
    </Button>
  </Center>
);

// Componente para "Productos por Vendedor" en un acordeón
const ProductsBySeller = () => {
  const { findSellersWithSalesInCurrentWeek, findProductsInSalesByUser } = SaleAction();
  const sellers = useSaleStore(state => state.usersInSales);
  const productsInSalesByUser = useSaleStore(state => state.productsInSalesByUser);

  useEffect(() => {
    findSellersWithSalesInCurrentWeek();
  }, []);

  const onClickAccordion = (user) => {
    if (!productsInSalesByUser[user.id]) {
      findProductsInSalesByUser(user.id);
    }
  };

  return (
    <Accordion allowMultiple>
      {sellers && sellers.map((seller) => (
        <AccordionItem key={seller.id} mb={4} border="1px" borderColor="gray.200" borderRadius="md">
          <AccordionButton onClick={() => onClickAccordion(seller)}>
            <Box flex="1" textAlign="left" fontWeight="bold">
              {seller.name} {seller.lastname}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <SellerTable seller={seller} products={productsInSalesByUser} />
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

const SellerTable = ({ seller, products }: { seller: Seller, products: any }) => {

  const totalAmount = products[seller.id]?.reduce(
    (acc, product) => acc + product.quantity * product.prices.reseller,
    0
  ) || 0;

  return (
    <Box>
      {products[seller.id]?.length > 0 && (
        <Box>
        <Table variant="simple" size="md" mb={2}>
        <Thead>
          <Tr>
            <Th>Producto</Th>
            <Th isNumeric>Cantidad</Th>
            <Th isNumeric>Color</Th>
            <Th isNumeric>Articulo</Th>
            <Th isNumeric>Precio</Th>
            <Th isNumeric>Fecha</Th>
            <Th isNumeric>Subtotal</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(products).length && products[seller.id].map((product: any) => (
            <Tr key={product.id}>
              <Td>{product.variantData.productName}</Td>
              <Td isNumeric>{product.quantity}</Td>
              <Td isNumeric>{capitalizeFirstLetter(product.variantData.variantAttributes?.[0]?.label || product.variantData.variantAttributes?.[0]?.value || '')}</Td>
              <Td isNumeric>{product.variantData.productCode}</Td>
              <Td isNumeric>{formattedNumberToMoney(product.prices.reseller)}</Td>
              <Td isNumeric>{formatDateYearMonthDay(product.createdAt)}</Td>
              <Td isNumeric>{formattedNumberToMoney((product.quantity * product.prices.reseller))}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Text fontSize="lg" fontWeight="bold" textAlign="right" mr={4}>
        Total: {formattedNumberToMoney(totalAmount)}
      </Text>
      {/* {seller.products.length > ITEMS_PER_PAGE_PRODUCTS && (
        <Pagination
          currentPage={productPage}
          totalPages={totalProductPages}
          onPrevious={() => setProductPage((prev) => Math.max(prev - 1, 1))}
          onNext={() => setProductPage((prev) => Math.min(prev + 1, totalProductPages))}
        />
      )} */}
      </Box>
      )}
    </Box>
  );
};

// Componente para "Total de Productos"
const TotalProducts = () => {
  const { findGroupedProductsInCurrentWeek } = SaleAction();
  const productsInSales = useSaleStore(state => state.productsInSales);

  useEffect(() => {
    findGroupedProductsInCurrentWeek();
  }, []);

  return (
    <Box>
      <Table variant="simple" size="md" mb={2}>
        <Thead>
          <Tr>
            <Th>Producto</Th>
            <Th isNumeric>Cantidad Total</Th>
            <Th isNumeric>Color</Th>
            <Th isNumeric>Articulo</Th>
            <Th isNumeric>Precio</Th>
            <Th isNumeric>Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {productsInSales.length && productsInSales.map((product) => (
            <Tr key={product.id}>
              <Td>{product.variantData.productName}</Td>
              <Td isNumeric>{product.quantity}</Td>
              <Td isNumeric>{capitalizeFirstLetter(product.variantData.variantAttributes?.[0]?.label || product.variantData.variantAttributes?.[0]?.value || '')}</Td>
              <Td isNumeric>{product.variantData.productCode}</Td>
              <Td isNumeric>{formattedNumberToMoney(product.prices.reseller)}</Td>
              <Td isNumeric>{formattedNumberToMoney((product.quantity * product.prices.reseller))}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {/* <Pagination
        currentPage={productPage}
        totalPages={totalProductPages}
        onPrevious={() => setProductPage((prev) => Math.max(prev - 1, 1))}
        onNext={() => setProductPage((prev) => Math.min(prev + 1, totalProductPages))}
      /> */}
    </Box>
  );
};

// Componente principal de Tabs
const SalesWeek = () => {
  const { clearSalesWeek, clearProductsInSales } = SaleAction();
  const handleRefresh = (tab: string) => {
    if (tab === 'sellers') {
      clearSalesWeek();
    } else {
      clearProductsInSales();
    }
  };

  return (
    <ChakraProvider>
      <Box height="100vh" p={4} overflowY="auto">
        <Tabs isFitted variant="enclosed" height="100%">
          <TabList mb="1em">
            <Tab>
              <Box display="flex" width={'100%'} alignItems={'center'} justifyContent={'center'}>
                <Text>Productos por Vendedor</Text>
              </Box>
              <Box>
                <Button
                  size="xs"
                  colorScheme="blue"
                  ml={2}
                  onClick={() => handleRefresh('sellers')} // Manejador de clics
                >
                  <Icon as={FiRefreshCcw} boxSize={4} /> {/* Ícono de recarga */}
                </Button>
              </Box>
            </Tab>
            <Tab>
            <Box display="flex" width={'100%'} alignItems={'center'} justifyContent={'center'}>
                <Text>Total por productos</Text>
              </Box>
              <Box>
                <Button
                  size="xs"
                  colorScheme="blue"
                  ml={2}
                  onClick={() => handleRefresh('products')} // Manejador de clics
                >
                  <Icon as={FiRefreshCcw} boxSize={4} /> {/* Ícono de recarga */}
                </Button>
              </Box>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ProductsBySeller />
            </TabPanel>
            <TabPanel>
              <TotalProducts />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </ChakraProvider>
  );
};

export default SalesWeek;
