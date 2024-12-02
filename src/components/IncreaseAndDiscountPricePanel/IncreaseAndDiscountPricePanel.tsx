import { Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, Flex, Heading, IconButton, Input, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { capitalizeFirstLetter, formattedNumberToMoney, roundUpTo500 } from '../../utils/functions';
import { IncreaseAndDiscountPricePanelProps } from './interfaces';
import { useProductStore } from '../../store/product/slice';
import { DeleteIcon } from '@chakra-ui/icons';
import { ProductAction } from '../../store/product/actions';

const IncreaseAndDiscountPricePanel: FC<IncreaseAndDiscountPricePanelProps> = props => {
  const productsSelected = useProductStore(state => state.productsSelected);
  const [percentage, setPercentage] = useState("0")
  const {selectProduct, increasePricesOfProducts} = ProductAction();
  const onIncreaseOrDiscountPrice = () => {
    increasePricesOfProducts({productsIds: productsSelected.map(prod => prod.id), percentageIncrease: parseFloat(percentage)})
  }
  return (
    <Drawer
      size="xl"
      isOpen={props.isOpen}
      placement="right"
      onClose={props.onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerBody
          overflowX="auto"  // Permite scroll horizontal
          css={{
            '&::-webkit-scrollbar': {
              width: '4px',
              height: '4px',
            },
            '&::-webkit-scrollbar-track': {
              width: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'gray.300',
              borderRadius: '24px',
            },
          }}
        >
          <Box minWidth="650px"> {/* Ancho mínimo para evitar que el contenido se comprima demasiado */}
            <Heading mb={5}>
              Aplicar Aumento o Descuento
            </Heading>
            <Divider my={5} />

            <Box mb={30}>
              <SimpleGrid
                columns={6}
                // spacing={4}
                minChildWidth="120px" // Ancho mínimo para cada columna
              >
                <Text>Producto</Text>
                <Text>P. Reventa Actual</Text>
                <Text>P. Reventa Nuevo</Text>
                <Text>P. Final Actual</Text>
                <Text>P. Final Nuevo</Text>
                <Text></Text>
              </SimpleGrid>

              <Divider borderColor="gray.800" my={4} />

              {productsSelected.map((product, index) => (
                <Box key={index}>
                  <SimpleGrid
                    columns={6}
                    spacing={4}
                    minChildWidth="120px"
                  >
                    <Text>{capitalizeFirstLetter(product.name)}</Text>
                    <Text>{formattedNumberToMoney(product.prices.reseller)}</Text>
                    <Text fontWeight={"bold"}>{formattedNumberToMoney( roundUpTo500((product.prices.reseller + (product.prices.reseller * parseFloat(percentage))  / 100)))}</Text>
                    <Text>{formattedNumberToMoney(product.prices.retail)}</Text>
                    <Text fontWeight={"bold"}>{formattedNumberToMoney( roundUpTo500((product.prices.retail + (product.prices.retail * parseFloat(percentage)) / 100)))}</Text>
                    <IconButton
                      aria-label='Delete'
                      icon={<DeleteIcon />}
                      variant='ghost'
                      onClick={() => selectProduct(product)}
                    />
                  </SimpleGrid>
                  <Divider />
                </Box>
              ))}
            </Box>
          </Box>

          {/* Footer sticky siempre visible */}
          <Box
            position="sticky"
            bottom={0}
            left={0}
            right={0}
            bg="white"
            p={4}
            borderTop="1px solid"
            borderColor="gray.200"
            width="100%"
            gap={4}
          >
            <Box w="100%" >
              <Flex gap={4}>
                <Input
                  type="number"
                  placeholder="Porcentaje (+ o -)"
                  width="200px"
                  borderColor="pink"
                  value={percentage !== "0" ? percentage : ""}
                  onChange={(e) => setPercentage(e.target.value !== "" && parseFloat(e.target.value) >= -95 ? e.target.value : '0')}
                  min={'-95'}
                />
                <Heading>{parseFloat(percentage) < 0 ? "Descuento" : "Aumento"} de {percentage}%</Heading>
              </Flex>
              <Button
                w="full"
                colorScheme="pink"
                my={4}
                onClick={onIncreaseOrDiscountPrice}
                isDisabled={percentage === "0"}
              >
                Aplicar {parseFloat(percentage) < 0 ? "Descuento" : "Aumento"}
              </Button>
            </Box>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default IncreaseAndDiscountPricePanel;