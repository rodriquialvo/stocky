import { Box, Flex, Image, Text, Button, VStack, HStack, useBreakpointValue, Divider, FormControl, FormLabel, Heading, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import NavigationBar from "../../components/TabNav/NavigationBar";
import { Select } from "chakra-react-select";
import QuantityPicker from "../../components/QuantityPicker/QuantityPicker";
import { useProductDetailController } from "./ProductDetail.controller";
import { ProductDetailProps } from "./interfaces";
import { formattedNumberToMoney } from "../../utils/functions";

const ProductDetail: React.FC<ProductDetailProps> = props => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageSelected, setImageSelected] = useState("")
  const { useController = useProductDetailController } = props;
  const controller = useController();

  useEffect(() => {
    if (controller.productDetail?.pictures.length > 0) {
      setImageSelected(controller.productDetail.pictures[0].url)
    }
  }, [controller.productDetail])

  const sizes = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },

  ]

  const colors = [
    { label: "Rojo", value: "Rojo" },
    { label: "Azul", value: "Azul" },
    { label: "Amarillo", value: "Amarillo" },
    { label: "Naranja", value: "Naranja" },

  ]
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
      // bg={"orange"}
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
                      borderWidth={imageSelected === image.url ? 2 : 0}
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
                        onClick={() => setImageSelected(image.url)}
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
                src={imageSelected}
                objectFit='cover'
                px={0}
                transform={isHovered ? 'scale(1.1)' : 'scale(1)'} // Aumentar tamaño cuando está en hover
                transition="transform 0.3s ease" // Animación suave

              />
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
            <Text>-Marca {controller.productDetail?.attributes.brand}</Text>
            <Text>-Talles: "FALTA ESTE CAMPO"</Text>
            <Text>-Colores: "FALTA ESTE CAMPO"</Text>
            <Text>-Articulo: {controller.productDetail?.code}</Text>
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
            >{controller.productDetail?.attributes.brand} - Articulo {controller.productDetail?.code}</Text>
            <Heading>{controller.productDetail?.name}</Heading >
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
              <Text>-Talles: "FALTA ESTE CAMPO"</Text>
              <Text>-Colores: "FALTA ESTE CAMPO"</Text>
              <Text>-Articulo: {controller.productDetail?.code}</Text>
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
                    options={colors}
                    placeholder="Selecciona un color"
                    size={{
                      base: "sm",
                      lg: "md"
                    }}
                  />
                </FormControl>
                <FormControl
                // width={"50%"}
                >
                  <FormLabel htmlFor="brand">Talle</FormLabel>
                  <Select
                    isSearchable={false}
                    options={sizes}
                    placeholder="Selecciona un talle"
                    size={{
                      base: "sm",
                      lg: "md"
                    }} />
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
                  stock={10}
                />
                <Button
                  w={"full"}
                  colorScheme={'pink'}
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
