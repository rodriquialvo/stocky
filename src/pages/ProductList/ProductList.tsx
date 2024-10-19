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
      <Accordion  gap={4} allowMultiple defaultIndex={[0]}>
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
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left'>
                Section 2 title
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};