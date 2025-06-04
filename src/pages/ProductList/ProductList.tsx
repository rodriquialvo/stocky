import { Box, Accordion, AccordionItem, Heading, Checkbox, Button, useBreakpointValue, Flex, Icon, Text } from '@chakra-ui/react';
import { FaSort } from 'react-icons/fa';

import ItemListProduct from '../../components/ItemListProduct/ItemListProduct';
import { useProductController } from './Product.controller';
import { ProductProps } from './interfaces';
import IncreaseAndDiscountPricePanel from '../../components/IncreaseAndDiscountPricePanel/IncreaseAndDiscountPricePanel';
import Pagination from '../../components/Pagination/Pagination';
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';

export const ProductList: React.FC<ProductProps> = (props) => {
  const { useController = useProductController } = props;
  const controller = useController();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const TableHeader = ({ label, showOnMobile = true }) => (
    <Flex 
      flex='1' 
      alignItems="center" 
      display={showOnMobile ? 'flex' : { base: 'none', lg: 'flex' }}
      gap={2}
      _hover={{ color: 'pink.500', cursor: 'pointer' }}
      transition="all 0.2s"
    >
      <Text fontWeight="bold" fontSize="md">{label}</Text>
      <Icon as={FaSort} w={3} h={3} />
    </Flex>
  );

  return (
    <Box className="relative min-h-screen" bg="gray.50">
      {controller.isLoading && <LoadingOverlay />}
      
      <Accordion allowMultiple>
        <AccordionItem 
          px={4} 
          py={4}
          bg="white"
          borderRadius="md"
          shadow="sm"
          mb={4}
          border="1px solid"
          borderColor="gray.200"
        >
          <Flex align="center" gap={4}>
            <Checkbox
              isChecked={controller.isAllproductsSelected}
              onChange={controller.onSelectAllProducts}
              colorScheme="pink"
              size="lg"
            />
            
            <TableHeader label="Nombre" />
            <TableHeader label="Marca" />
            <TableHeader label="Artículo" />
            <TableHeader label="P. Reventa" showOnMobile={false} />
            <TableHeader label="P. Final" showOnMobile={false} />
            <TableHeader label="Stock" />
            <TableHeader label="Acciones" />
          </Flex>
        </AccordionItem>

        {controller.productsViewModel.map(item => (
          <ItemListProduct
            {...item}
            key={item.id}
          />
        ))}
      </Accordion>

      <Button
        position="fixed"
        bottom="4"
        right="4"
        colorScheme="pink"
        borderRadius="full"
        boxShadow="lg"
        p={6}
        zIndex={20}
        leftIcon={<Icon as={FaSort} />}
        onClick={controller.onPressedButtonOpenPanelIncreaseAndDiscount}
      >
        Aplicar aumento/descuento
      </Button>

      <IncreaseAndDiscountPricePanel
        isOpen={controller.isOpenIncreaseAndDiscountPanel}
        onClose={controller.onClosePanelIncreaseAndDiscount}
      />

      <Box position="sticky" bottom={0} bg="white" p={4} shadow="lg">
        <Pagination
          currentPage={controller.currentPage}
          totalPages={controller.totalPages}
          onPageChange={controller.setCurrentPage}
        />
      </Box>
    </Box>
  );
};