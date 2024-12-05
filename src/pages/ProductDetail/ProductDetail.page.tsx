import { Box, Button, Divider, Flex, FormControl, FormLabel, Heading, Image, Spinner, Stack, Text } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useState } from "react";
import QuantityPicker from "../../components/QuantityPicker/QuantityPicker";
import NavigationBar from "../../components/TabNav/NavigationBar";
import { capitalizeFirstLetter, formattedNumberToMoney } from "../../utils/functions";
import { useProductDetailController } from "./ProductDetail.controller";
import { ProductDetailProps } from "./interfaces";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";

const ProductDetail: React.FC<ProductDetailProps> = props => {
  const [isHovered, setIsHovered] = useState(false);

  const { useController = useProductDetailController } = props;
  const controller = useController();

  return (
    <Box
      w="100%"
      h="100%"
      position="relative"
      overflow="hidden"
      justifyContent="center"
      flex={1}
      display={"flex"}
      flexDirection={"column"}
    >
      <NavigationBar
      // onClickFilterButton={onOpen}
      />
      {
        controller.isLoading && (
          <LoadingOverlay />
        )
      }
      <Box
        display={"flex"}
        flexDirection={{
          base: "column",
          lg: "row"
        }}
        borderWidth={1}
        padding={10}
        width={"90%"}
        alignSelf={"center"}
      >
        <Box
          width={{
            base: "100%",
            lg: "50%"
          }}
        >
          <Box
            display="flex"
            flexDirection="row"
            alignSelf={"center"}
            width={"100%"}
            height={500}

          // bg="blue"

          >
            <Box
              overflow={"scroll"}
              gap={4}
              display={{
                base: "none",
                md: "flex"
              }}
              flexDirection={"column"}
              // px={10}
              css={{
                /* Oculta el scroll en diferentes navegadores */
                scrollbarWidth: 'none', /* Firefox */
                '-ms-overflow-style': 'none', /* IE y Edge */
              }}
              sx={{
                '::-webkit-scrollbar': {
                  display: 'none', /* Chrome, Safari y Opera */
                },
              }}
            // bg="yellow"
            >
              {
                controller.productDetail?.pictures.map(image => {
                  return (
                    <Box
                      borderWidth={controller.imageSelected === image.url ? 2 : 0}
                      borderColor={"black"}
                      borderRadius={7}
                    >
                      <Image
                        height={60}
                        width={"auto"}
                        src={image.url}
                        className="object-cover"
                        objectFit='cover'
                        px={0}
                        onClick={() => controller.setImageSelected(image.url)}
                        borderRadius={5}
                        alt={image.alt_text}
                      />
                    </Box>)
                })
              }
            </Box>
            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
              onMouseEnter={() => setIsHovered(true)} // Activar zoom al pasar el cursor
              onMouseLeave={() => setIsHovered(false)} // Desactivar zoom al salir
              overflow="hidden" // Para evitar que la imagen se desborde
            >
              <Image
                height={"100%"}
                width={"auto"}
                src={controller.imageSelected}
                objectFit='cover'
                px={0}
                transform={isHovered ? 'scale(1.1)' : 'scale(1)'} // Aumentar tamaño cuando está en hover
                transition="transform 0.3s ease" // Animación suave
              />
              <Box position={"absolute"} w={'100%'} display={{
                base: 'flex',
                md: 'none'
              }} justifyContent={"space-between"}>

                <Button
                  onClick={controller.handlePrev}
                  position="absolute"
                  left={2}
                  top="50%"
                  transform="translateY(-50%)"
                  colorScheme="teal" // Personaliza el color del botón
                >
                  &#8249; {/* Ícono de flecha izquierda */}
                </Button>
                <Button
                  onClick={controller.handleNext}
                  position="absolute"
                  right={2}
                  top="50%"
                  transform="translateY(-50%)"
                  colorScheme="teal" // Personaliza el color del botón
                >
                  &#8250; {/* Ícono de flecha derecha */}
                </Button>
              </Box>
            </Box>
          </Box>
          <Box
            bg="gray.100"
            my={10}
            padding={{
              base: 5,
              lg: 10
            }}
            gap={4}
            display={{
              base: "none",
              lg: "flex"
            }}
            flexDirection={"column"}
            width={"100%"}
          >
            <Text>Detalles del producto:</Text>
            <Text>{controller.productDetail?.description}</Text>
            <Text>-Marca: {capitalizeFirstLetter(controller.productDetail?.attributes.brand)}</Text>
            <Text>-Talles: {controller.productDetail?.sizes.join(", ")}</Text>
            <Text>-Colores: {controller.colorsProduct.map(color => color.label).join(", ")}</Text>
            <Text>-Artículo: {controller.productDetail?.code}</Text>
          </Box>
        </Box>
        <Box
          width={{
            base: "100%",
            lg: "50%"
          }}
          pl={{
            base: 0,
            lg: 5
          }}
        >
          <Stack
            padding={{
              base: 0,
              lg: 10
            }}
            position={"sticky"}
            borderWidth={{
              base: 0,
              lg: 1
            }}
            spacing={4}
          >
            <Text
              color={"GrayText"}
            >{capitalizeFirstLetter(controller.productDetail?.attributes.brand)} - Artículo {controller.productDetail?.code}</Text>
            <Heading>{capitalizeFirstLetter(controller.productDetail?.name)}</Heading >
            <Heading>{formattedNumberToMoney(controller.productDetail?.prices.retail)}</Heading>
            <Divider
              my={5}
              display={{
                base: "none",
                lg: "flex"
              }}
            />
            <Box
              bg="gray.100"
              my={10}
              padding={{
                base: 5,
                lg: 10
              }}
              gap={4}
              display={{
                base: "flex",
                lg: "none"
              }}
              flexDirection={"column"}
              width={"100%"}
            >
              <Text>Detalles del producto:</Text>
              <Text>{controller.productDetail?.description}</Text>
              <Text>-Marca {controller.productDetail?.attributes.brand}</Text>
              <Text>-Talles: {controller.productDetail?.sizes.join(", ")}</Text>
              <Text>-Colores: {controller.colorsProduct.map(color => color.label).join(", ")}</Text>
              <Text>-Artículo: {controller.productDetail?.code}</Text>
            </Box>
            <Flex
              gap={8}
              flexDirection={"column"}
            >
              <Box
                display={"flex"}
                gap={5}
                flexDirection={{
                  base: "column",
                  lg: "row"
                }}
              >
                <FormControl
                  width={"100%"}
                >
                  <FormLabel htmlFor="brand">Color</FormLabel>
                  <Select
                    isSearchable={false}
                    options={controller.colorsProduct}
                    placeholder="Selecciona un color"
                    size={{
                      base: "sm",
                      lg: "md"
                    }}
                    onChange={controller.handleSelectColor}
                    isDisabled={!controller.productDetail?.hasStock}
                  />
                </FormControl>
                <FormControl
                >
                  <FormLabel htmlFor="brand">Talle</FormLabel>
                  <Select
                    isSearchable={false}
                    options={controller.sizes}
                    placeholder="Selecciona un talle"
                    size={{
                      base: "sm",
                      lg: "md"
                    }}
                    onChange={controller.handleSelectSize}
                    isDisabled={!controller.productDetail?.hasStock}
                    value={controller.sizes?.find((size) => size.value === controller.size) || null}
                  />
                </FormControl>
              </Box>
              <Flex
                gap={4}
                flexDir={{
                  base: "column",
                  lg: "row"
                }}
              >
                <QuantityPicker
                  stock={100}
                  quantity={controller.quantity}
                  onIncrease={controller.onIncrease}
                  onDecrease={controller.onDecrease}
                  isDisabled={controller.isDisabledButton}
                />
                <Button
                  isDisabled={controller.isDisabledButton}
                  w={"full"}
                  colorScheme={'pink'}
                  onClick={() => controller.onAddToCartPressed({ size: controller.size, color: controller.color, quantity: controller.quantity })}
                >Agregar al carrito</Button>
              </Flex>
            </Flex>

          </Stack>
        </Box>
      </Box>
    </Box>
  )
}

export default ProductDetail;
