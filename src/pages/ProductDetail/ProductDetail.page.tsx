import { Box, Button, Divider, Flex, FormControl, FormLabel, Heading, Image, Stack, Text, Tooltip, Badge, HStack, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useState } from "react";
import QuantityPicker from "../../components/QuantityPicker/QuantityPicker";
import { capitalizeFirstLetter, formattedNumberToMoney } from "../../utils/functions";
import { useProductDetailController } from "./ProductDetail.controller";
import { ProductDetailProps } from "./interfaces";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";

const ProductDetail: React.FC<ProductDetailProps> = props => {
  const [isHovered, setIsHovered] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { useController = useProductDetailController } = props;
  const controller = useController();

  const currentImageIndex = controller.productDetail?.pictures.findIndex(img => img.url === controller.imageSelected) || 0;
  const totalImages = controller.productDetail?.pictures.length || 0;

  return (
    <Box
      w="100%"
      minH="100vh"
      bg="white"
      position="relative"
      overflow="hidden"
      justifyContent="center"
      flex={1}
      display={"flex"}
      flexDirection={"column"}
      py={0}
    >
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
        bg="white"
        width="100%"
        mx="auto"
        alignSelf={"center"}
        px={{
          base: 4,
          md: 8,
          lg: 10
        }}
        py={{
          base: 4,
          md: 8,
          lg: 10
        }}
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
            position="relative"
          >
            <Box
              overflow={"scroll"}
              gap={4}
              display={{
                base: "none",
                md: "flex"
              }}
              flexDirection={"column"}
              css={{
                scrollbarWidth: 'none',
                '-ms-overflow-style': 'none',
              }}
              sx={{
                '::-webkit-scrollbar': {
                  display: 'none',
                },
              }}
            >
              {
                controller.productDetail?.pictures.map((image, index) => {
                  return (
                    <Tooltip _hover={{ 
                      transform: 'scale(1.05)',
                      borderWidth: controller.imageSelected === image.url ? 2 : 1,
                      borderColor: "pink.500"
                    }} key={index} label={`Imagen ${index + 1} de ${totalImages}`}>
                      <Box
                        borderWidth={controller.imageSelected === image.url ? 2 : 0}
                        borderColor={"pink.500"}
                        cursor="pointer"
                        transition="all 0.2s"
                        
                        sx={{
                          '&:hover': {
                            borderWidth: controller.imageSelected === image.url ? '2px !important' : '1px',
                            borderColor: 'pink.500',
                            borderStyle: 'solid'
                          }
                        }}
                      >
                        <Image
                          height={60}
                          width={"auto"}
                          src={image.url}
                          className="object-cover"
                          objectFit='cover'
                          px={0}
                          onClick={() => controller.setImageSelected(image.url)}
                          alt={image.alt_text}
                        />
                      </Box>
                    </Tooltip>
                  )
                })
              }
            </Box>
            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              overflow="hidden"
              position="relative"
            >
              <Image
                height={"100%"}
                width={"auto"}
                src={controller.imageSelected}
                objectFit='cover'
                px={0}
                transform={isHovered ? 'scale(1.1)' : 'scale(1)'}
                transition="transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                onClick={onOpen}
                cursor="pointer"
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
                  colorScheme="pink"
                  borderRadius="full"
                >
                  ←
                </Button>
                <Button
                  onClick={controller.handleNext}
                  position="absolute"
                  right={2}
                  top="50%"
                  transform="translateY(-50%)"
                  colorScheme="pink"
                  borderRadius="full"
                >
                  →
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
            borderRadius="lg"
          >
            <Text fontWeight="bold">Detalles del producto:</Text>
            <Text>{capitalizeFirstLetter(controller.productDetail?.description)}</Text>
            <HStack spacing={4}>
              <Text fontWeight="bold">Marca:</Text>
              <Text>{capitalizeFirstLetter(controller.productDetail?.attributes.brand)}</Text>
            </HStack>
            <HStack spacing={4}>
              <Text fontWeight="bold">Talles:</Text>
              <Text>{controller.productDetail?.sizes.join(", ")}</Text>
            </HStack>
            <HStack spacing={4}>
              <Text fontWeight="bold">Colores:</Text>
              <Text>{controller.colorsProduct.map(color => color.label).join(", ")}</Text>
            </HStack>
            <HStack spacing={4}>
              <Text fontWeight="bold">Artículo:</Text>
              <Text>{controller.productDetail?.code}</Text>
            </HStack>
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
            <Text color={"GrayText"}>
              {capitalizeFirstLetter(controller.productDetail?.attributes.brand)} - Artículo {controller.productDetail?.code}
            </Text>
            <Heading>{capitalizeFirstLetter(controller.productDetail?.name)}</Heading>
            <Box>
              <Heading color="pink.500" fontSize="2xl">
                {formattedNumberToMoney(controller.productDetail?.prices.retail)}
              </Heading>
              <Badge colorScheme="red" fontSize="md" p={2} borderRadius="md">
                -30% a partir de 2da pieza 🔥
              </Badge>
            </Box>
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
              borderRadius="lg"
            >
              <Text fontWeight="bold">Detalles del producto:</Text>
              <Text>{controller.productDetail?.description}</Text>
              <HStack spacing={4}>
                <Text fontWeight="bold">Marca:</Text>
                <Text>{controller.productDetail?.attributes.brand}</Text>
              </HStack>
              <HStack spacing={4}>
                <Text fontWeight="bold">Talles:</Text>
                <Text>{controller.productDetail?.sizes.join(", ")}</Text>
              </HStack>
              <HStack spacing={4}>
                <Text fontWeight="bold">Colores:</Text>
                <Text>{controller.colorsProduct.map(color => color.label).join(", ")}</Text>
              </HStack>
              <HStack spacing={4}>
                <Text fontWeight="bold">Artículo:</Text>
                <Text>{controller.productDetail?.code}</Text>
              </HStack>
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
                    value={controller.colorsProduct?.find((color) => color.value === controller.color) || null}
                  />
                </FormControl>
                <FormControl>
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
                  size="lg"
                  onClick={() => controller.onAddToCartPressed({ size: controller.size, color: controller.color, quantity: controller.quantity })}
                >
                  Agregar al carrito
                </Button>
              </Flex>
            </Flex>
          </Stack>
        </Box>
      </Box>
      {/* Modal para zoom */}
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent bg="rgba(0, 0, 0, 0.9)" margin={0} rounded="none">
          <ModalCloseButton color="white" size="lg" />
          <ModalBody 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            p={{
              base: 4,
              md: 10
            }}
          >
            <Image
              src={controller.imageSelected}
              maxH="90vh"
              maxW="90vw"
              objectFit="contain"
              onClick={onClose}
              cursor="pointer"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default ProductDetail;
