import { Box, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Heading, Checkbox, Button } from '@chakra-ui/react';

import NavigationBar from '../../components/TabNav/NavigationBar';
import ItemListProduct from '../../components/ItemListProduct/ItemListProduct';
import { useProductController } from './Product.controller';
import { ProductProps } from './interfaces';
import { AddIcon } from '@chakra-ui/icons';
import IncreaseAndDiscountPricePanel from '../../components/IncreaseAndDiscountPricePanel/IncreaseAndDiscountPricePanel';

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
            Articulo
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
        zIndex={10}
        onClick={controller.onPressedButtonOpenPanelIncreaseAndDiscount}
      >
        Aplicar aumento/descuento
      </Button>
      <IncreaseAndDiscountPricePanel
        isOpen={controller.isOpenIncreaseAndDiscountPanel}
        onClose={controller.onClosePanelIncreaseAndDiscount}
      />
    </Box>
  );
};