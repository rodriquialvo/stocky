import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Checkbox, Flex, Text, Badge, Image, useBreakpointValue, IconButton } from '@chakra-ui/react';
import React, { FC, MouseEvent, ChangeEvent } from 'react';
import { ItemListProductProps } from './interfaces';
import { useProductStore } from '../../store/product/slice';
import { capitalizeFirstLetter, formattedNumberToMoney } from '../../utils/functions';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/Routes';
import { useProductAtributesStore } from '../../store/product-atributes/slice';
import { FaEdit } from 'react-icons/fa';

const ItemListProduct: FC<ItemListProductProps> = props => {
  const productsWhitStocks = useProductStore(state => state.productsWhitStocks);
  const allColors = useProductAtributesStore(state => state.allColors);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const colorsObj = allColors.length ? allColors.reduce((acc, color) => {
    return {
      ...acc,
      [color.value]: color.label
    }
  }) : {};

  const navigate = useNavigate();

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    props.onPressCheckbox?.();
  };

  const handleEditClick = (e: MouseEvent) => {
    e.stopPropagation();
    navigate(ROUTES.NEW_PRODUCT, { state: { product: props.fullProduct } });
  };

  return (
    <AccordionItem onClick={props.onClick}>
      <AccordionButton 
        px={4} 
        py={4}
        _hover={{ bg: 'gray.50' }}
        transition="all 0.2s"
        borderBottom="1px solid"
        borderColor="gray.200"
      >
        <Flex align="center" gap={4} width="100%">
          <Checkbox
            isChecked={props.isChecked}
            onChange={handleCheckboxChange}
            colorScheme="pink"
            size="lg"
            onClick={(e) => e.stopPropagation()}
          />
          
          <Flex flex='1' direction="column" align="start">
            <Text fontWeight="semibold">{capitalizeFirstLetter(props.name)}</Text>
            {isMobile && <Text fontSize="sm" color="gray.600">{capitalizeFirstLetter(props?.brand)}</Text>}
          </Flex>
          
          {!isMobile && <Text flex='1'>{capitalizeFirstLetter(props?.brand)}</Text>}
          <Text flex='1'>{props?.code.toUpperCase()}</Text>
          
          <Text flex='1' display={{ base: "none", lg: "block" }}>
            {formattedNumberToMoney(props?.priceResseller)}
          </Text>
          
          <Text flex='1' display={{ base: "none", lg: "block" }}>
            {formattedNumberToMoney(props?.priceRetail)}
          </Text>
          
          <Badge 
            flex='1'
            colorScheme={props?.hasStock ? "green" : "red"}
            px={2}
            py={1}
            borderRadius="full"
          >
            {props?.hasStock ? "Disponible" : "No disponible"}
          </Badge>
          
          <IconButton
            aria-label="Editar"
            icon={<FaEdit />}
            colorScheme="pink"
            variant="ghost"
            onClick={handleEditClick}
          />
          
          <AccordionIcon />
        </Flex>
      </AccordionButton>

      <AccordionPanel 
        bg="white" 
        p={6}
        borderBottom="1px solid"
        borderColor="gray.200"
      >
        <Flex direction={{ base: "column", lg: "row" }} gap={6}>
          <Box flex="1">
            <Text fontWeight="bold" color="pink.500" mb={2}>Detalles del Producto</Text>
            <Flex direction="column" gap={2}>
              <Text><strong>Descripción:</strong> {productsWhitStocks[props.id]?.name}</Text>
              <Text><strong>Artículo:</strong> {productsWhitStocks[props.id]?.code.toString().toUpperCase()}</Text>
              <Text><strong>Precio Minorista:</strong> {formattedNumberToMoney(productsWhitStocks[props.id]?.prices?.retail)}</Text>
              <Text><strong>Precio Revendedor:</strong> {formattedNumberToMoney(productsWhitStocks[props.id]?.prices?.reseller)}</Text>
              <Text><strong>Precio Mayorista 6 unidades:</strong> {formattedNumberToMoney(productsWhitStocks[props.id]?.prices?.wholesale?.half_dozen)}</Text>
              <Text><strong>Precio Mayorista +6 unidades:</strong> {formattedNumberToMoney(productsWhitStocks[props.id]?.prices?.wholesale?.dozen)}</Text>
            </Flex>
          </Box>

          {!!productsWhitStocks[props.id]?.stocks.length && (
            <Box flex="2">
              <Text fontWeight="bold" color="pink.500" mb={4}>Inventario Disponible</Text>
              <Flex wrap="wrap" gap={4}>
                {productsWhitStocks[props.id]?.stocks.map((stock, index) => (
                  <Box 
                    key={index}
                    p={4}
                    bg="gray.50"
                    borderRadius="md"
                    minW="200px"
                  >
                    <Text fontWeight="semibold" mb={2}>
                      Color: {colorsObj[stock.variant.color] || ''} / Talle: {stock.variant.sizeLabel}
                    </Text>
                    <Text color="gray.600">Cantidad: {stock.quantity} {stock.quantity > 1 ? "unidades" : "unidad"}</Text>
                    <Text color="gray.600">Precio de costo: {formattedNumberToMoney(stock.costPrice)}</Text>
                  </Box>
                ))}
              </Flex>
            </Box>
          )}
        </Flex>

        <Flex justify="center" mt={6}>
          <Button
            colorScheme="pink"
            size="lg"
            onClick={() => navigate(ROUTES.PRODUCT_DETAILS(props.id))}
          >
            Ver Detalles Completos
          </Button>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default ItemListProduct;
