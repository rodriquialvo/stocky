import { Box, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from '@chakra-ui/react';

import NavigationBar from '../../components/TabNav/NavigationBar';
import ItemListProduct from '../../components/ItemListProduct/ItemListProduct';
import { useProductController } from './Product.controller';
import { ProductProps } from './interfaces';

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
      <Accordion allowMultiple gap={4}>
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
    </Box>
  );
};