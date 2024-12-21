import { Box, Accordion, AccordionItem, Heading, Checkbox, Button } from '@chakra-ui/react';

import NavigationBar from '../../components/TabNav/NavigationBar';
import ItemListProduct from '../../components/ItemListProduct/ItemListProduct';
import { useProductController } from './Product.controller';
import { ProductProps } from './interfaces';
import IncreaseAndDiscountPricePanel from '../../components/IncreaseAndDiscountPricePanel/IncreaseAndDiscountPricePanel';
import Pagination from '../../components/Pagination/Pagination';
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';
import { ProductAction } from '../../store/product/actions';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/Routes';

export const ProductList: React.FC<ProductProps> = (props) => {
  const { useController = useProductController } = props;
  const controller = useController();
  


  // if (isSidebarExpanded && isMobile) {
  //   return null;
  // }
  return (
    <Box className=" relative min-h-screen">
      <NavigationBar
      />
      {
        controller.isLoading && (
          <LoadingOverlay />
        )
      }
      <Accordion allowMultiple>
        <AccordionItem px={2} bg={"gray.300"} display={"flex"} py={3}>
          <Checkbox
            isChecked={controller.isAllproductsSelected}
            onMouseDown={controller.onSelectAllProducts}
            colorScheme={"pink"}
          />
          <Heading
            ml={5}
            fontSize="md" flex='1' textAlign='left'>
            Nombre
          </Heading>
          <Heading fontSize="md" flex='1' textAlign='left'>Marca</Heading>
          <Heading fontSize="md" flex='1' textAlign='left'>
            Artículo
          </Heading>
          <Heading
            display={{
              base: "none",
              lg: "flex"
            }} fontSize="md" flex='1' textAlign='left'>
            P. Reventa
          </Heading>
          <Heading
            display={{
              base: "none",
              lg: "flex"
            }} fontSize="md" flex='1' textAlign='left'>
            P. Final
          </Heading>
          <Heading color={"green.700"} fontSize="md" flex='1' textAlign='left'>
            Disponibilidad
          </Heading>
        </AccordionItem>
        {
          controller.productsViewModel.map(item => {
            return (
              <ItemListProduct
                {...item}
                key={item.id}
              />
            )
          })
        }
      </Accordion>
      <Button
        position="fixed"
        bottom="4"
        right="4"
        colorScheme="teal"
        borderRadius="full"
        boxShadow="md"
        p={4}
        zIndex={20}
        onClick={controller.onPressedButtonOpenPanelIncreaseAndDiscount}
      >
        Aplicar aumento/descuento
      </Button>
      <IncreaseAndDiscountPricePanel
        isOpen={controller.isOpenIncreaseAndDiscountPanel}
        onClose={controller.onClosePanelIncreaseAndDiscount}
      />
      <Pagination
        currentPage={controller.currentPage}
        totalPages={controller.totalPages}
        onPageChange={controller.setCurrentPage}
      />
    </Box>
  );
};