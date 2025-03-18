import { Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Heading, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, SimpleGrid, Text, VStack, useToast } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { capitalizeFirstLetter, formattedNumberToMoney, roundUpTo100 } from '../../utils/functions';
import { IncreaseAndDiscountPricePanelProps } from './interfaces';
import { useProductStore } from '../../store/product/slice';
import { DeleteIcon } from '@chakra-ui/icons';
import { ProductAction } from '../../store/product/actions';
import { FaPercent, FaTrash } from 'react-icons/fa';

const IncreaseAndDiscountPricePanel: FC<IncreaseAndDiscountPricePanelProps> = props => {
  const productsSelected = useProductStore(state => state.productsSelected);
  const [percentage, setPercentage] = useState("0");
  const { selectProduct, increasePricesOfProducts } = ProductAction();
  const toast = useToast();

  const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setPercentage("0");
      return;
    }
    const numValue = parseFloat(value);
    if (numValue >= -95) {
      setPercentage(value);
    }
  };

  const onIncreaseOrDiscountPrice = () => {
    if (!productsSelected.length) {
      toast({
        title: "No hay productos seleccionados",
        description: "Por favor, selecciona al menos un producto para aplicar el cambio de precio.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    if (percentage === "0") {
      toast({
        title: "Porcentaje inválido",
        description: "Por favor, ingresa un porcentaje diferente de 0.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    increasePricesOfProducts({
      productsIds: productsSelected.map(prod => prod.id),
      percentageIncrease: parseFloat(percentage)
    });
  }

  return (
    <Drawer
      isOpen={props.isOpen}
      placement="right"
      onClose={props.onClose}
      size="xl"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">
          <Heading size="lg" color="pink.500">
            {parseFloat(percentage) < 0 ? "Aplicar Descuento" : "Aplicar Aumento"}
          </Heading>
        </DrawerHeader>

        <DrawerBody>
          <Box p={4}>
            <VStack spacing={6} align="stretch">
              <Box>
                <Flex justify="space-between" align="center" mb={2}>
                  <Text fontWeight="bold">Porcentaje de {parseFloat(percentage) < 0 ? "Descuento" : "Aumento"}</Text>
                  <Text color={parseFloat(percentage) < 0 ? "red.500" : "green.500"} fontWeight="bold">
                    {percentage}%
                  </Text>
                </Flex>
                <InputGroup size="lg">
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.500"
                    fontSize="1.2em"
                    children={<FaPercent />}
                  />
                  <Input
                    placeholder="Porcentaje (+ o -)"
                    value={percentage !== "0" ? percentage : ""}
                    onChange={handlePercentageChange}
                    type="number"
                    min="-95"
                    size="lg"
                    borderColor={parseFloat(percentage) < 0 ? "red.200" : "green.200"}
                    _hover={{ borderColor: parseFloat(percentage) < 0 ? "red.300" : "green.300" }}
                    _focus={{ 
                      borderColor: parseFloat(percentage) < 0 ? "red.500" : "green.500",
                      boxShadow: `0 0 0 1px ${parseFloat(percentage) < 0 ? "#E53E3E" : "#38A169"}`
                    }}
                  />
                </InputGroup>
                <Text fontSize="sm" color="gray.500" mt={1}>
                  Ingresa un valor entre -95% y +∞%
                </Text>
              </Box>

              <Divider />

              <Box>
                <Flex justify="space-between" align="center" mb={4}>
                  <Text fontWeight="bold" fontSize="lg">Productos Seleccionados ({productsSelected.length})</Text>
                  <Button
                    colorScheme={parseFloat(percentage) < 0 ? "red" : "green"}
                    size="lg"
                    onClick={onIncreaseOrDiscountPrice}
                    isDisabled={!productsSelected.length || percentage === "0"}
                  >
                    Aplicar {parseFloat(percentage) < 0 ? "Descuento" : "Aumento"}
                  </Button>
                </Flex>

                <Box maxH="calc(100vh - 300px)" overflowY="auto" px={2}>
                  {productsSelected.map((product, index) => (
                    <Box
                      key={index}
                      p={4}
                      bg="white"
                      borderRadius="lg"
                      boxShadow="sm"
                      mb={4}
                      border="1px solid"
                      borderColor="gray.200"
                      position="relative"
                      _hover={{ borderColor: parseFloat(percentage) < 0 ? "red.200" : "green.200" }}
                    >
                      <Flex justify="space-between" align="start">
                        <Box flex="1">
                          <Text fontWeight="semibold" fontSize="lg" mb={2}>
                            {capitalizeFirstLetter(product.name)}
                          </Text>
                          
                          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                            <Box>
                              <Text color="gray.600">Precio Reventa Actual:</Text>
                              <Text fontSize="lg">{formattedNumberToMoney(product.prices.reseller)}</Text>
                              <Text 
                                color={parseFloat(percentage) < 0 ? "red.500" : "green.500"} 
                                fontWeight="bold"
                              >
                                Nuevo: {formattedNumberToMoney(roundUpTo100((product.prices.reseller + (product.prices.reseller * parseFloat(percentage)) / 100)))}
                              </Text>
                            </Box>
                            
                            <Box>
                              <Text color="gray.600">Precio Final Actual:</Text>
                              <Text fontSize="lg">{formattedNumberToMoney(product.prices.retail)}</Text>
                              <Text 
                                color={parseFloat(percentage) < 0 ? "red.500" : "green.500"}
                                fontWeight="bold"
                              >
                                Nuevo: {formattedNumberToMoney(roundUpTo100((product.prices.retail + (product.prices.retail * parseFloat(percentage)) / 100)))}
                              </Text>
                            </Box>
                          </SimpleGrid>
                        </Box>

                        <IconButton
                          aria-label="Eliminar producto"
                          icon={<FaTrash />}
                          variant="ghost"
                          colorScheme="red"
                          onClick={() => selectProduct(product)}
                        />
                      </Flex>
                    </Box>
                  ))}

                  {!productsSelected.length && (
                    <Flex 
                      direction="column" 
                      align="center" 
                      justify="center" 
                      py={10}
                      color="gray.500"
                    >
                      <Text fontSize="lg" mb={2}>No hay productos seleccionados</Text>
                      <Text>Selecciona productos de la lista para ajustar sus precios</Text>
                    </Flex>
                  )}
                </Box>
              </Box>
            </VStack>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default IncreaseAndDiscountPricePanel;