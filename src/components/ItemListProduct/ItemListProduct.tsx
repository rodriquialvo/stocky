import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import { ItemListProductProps } from './interfaces';
import { useProductStore } from '../../store/product/slice';
import { formattedNumberToMoney } from '../../utils/functions';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/Routes';

//REMOVE
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ItemListProduct: FC<ItemListProductProps> = props => {
  const productsWhitStocks = useProductStore(state => state.productsWhitStocks)
  const navigate = useNavigate();
  return (
    <AccordionItem onClick={props.onClick}>
      <h2>
        <AccordionButton py={3}>
          <Heading
            fontSize="md"  flex='1' textAlign='left'>
            {props.name}
          </Heading>
          <Heading fontSize="md"  flex='1' textAlign='center'>{props?.brand}</Heading>
          <Heading fontSize="md"  flex='1' textAlign='left'>
            Articulo {props?.code}
          </Heading>
          <Heading color={props?.hasStock ? "green.700" : "red.500"} fontSize="md"  flex='1' textAlign='left'>
            {props?.hasStock ? "DISPONIBLE" : "NO DISPONIBLE"}
          </Heading>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel bg={"gray.100"}
        m={5}>
        <SimpleGrid
          columns={{ base: 2, md: 2, lg: 5 }}
        >
          <Box
            gap={4}
            alignItems={"center"}
          >
            <Heading
              color={"pink.600"}
              fontSize="md"
            >Descripcion:</Heading>
            <Text fontSize="md" color="gray.600" as='span' >{productsWhitStocks[props.id]?.name}</Text>
          </Box>
          <Box
            gap={4}
            alignItems={"center"}
          >
            <Heading
              fontSize="md"
              color={"pink.600"}
            >Articulo:</Heading>
            <Text fontSize="md" color="gray.600" as='span' >{productsWhitStocks[props.id]?.code.toString().toUpperCase()}</Text>
          </Box>
          <Box
            gap={4}
            alignItems={"center"}
          >
            <Heading
              color={"pink.600"}
              fontSize="md"
            >Precio Minorista:</Heading>
            <Text fontSize="md" color="gray.600" as='span' >{formattedNumberToMoney(productsWhitStocks[props.id]?.prices.retail)}</Text>
          </Box>
          <Box
            gap={4}
            alignItems={"center"}
          >
            <Heading
              color={"pink.600"}
              fontSize="md"
            >Precio Revendedor:</Heading>
            <Text fontSize="md" color="gray.600" as='span' >{formattedNumberToMoney(productsWhitStocks[props.id]?.prices.reseller)}</Text>
          </Box>
        </SimpleGrid>

        {
          !!productsWhitStocks[props.id]?.stocks.length && (
            <Box
              mt={4}
              display={"flex"}
              flexDirection={"column"}
            >
              <Heading
                fontSize="lg"
                my={4}
              >STOCKS:</Heading>
              <SimpleGrid
                columns={{ base: 2, md: 2, lg: 5 }}
              >
                {productsWhitStocks[props.id]?.stocks.map(stock => (
                  <Box
                    gap={4}
                    alignItems={"center"}
                  >
                    <Heading
                      fontSize="md"
                    >Color {stock.variant.color} / Talle {stock.variant.size}:</Heading>
                    <Text fontSize="md" color="pink.600" >Cantidad: <Text as="span" color="gray.600">{stock.quantity} {stock.quantity > 1 ? "unidades" : "unidad"}</Text></Text>
                    <Text fontSize="md" color="pink.600" >Precio de costo: <Text as="span" color="gray.600">{formattedNumberToMoney(stock.costPrice)}</Text></Text>
                  </Box>
                ))
                }
              </SimpleGrid>
            </Box>
          )
        }
        <Box
          mt={4}
          alignItems={"center"}
          display={"flex"}
          flexDirection={"column"}
        >
          <Button
            w={{
              base: "100%",
              lg: "20%"
            }}
            colorScheme={'pink'}
            alignSelf={"center"}
            display={"flex"}
            onClick={() => navigate(ROUTES.PRODUCT_DETAILS(props.id))}
          >Visitar Producto</Button>
        </Box>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default ItemListProduct;
