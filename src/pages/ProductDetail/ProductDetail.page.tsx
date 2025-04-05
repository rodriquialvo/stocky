import { Box, Button, Divider, Flex, FormControl, FormLabel, Heading, Image, Stack, Text, Tooltip, Badge, HStack, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, useDisclosure, Switch, VStack, SimpleGrid } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useState } from "react";
import QuantityPicker from "../../components/QuantityPicker/QuantityPicker";
import WholesaleVariantSelector from "../../components/WholesaleVariantSelector/WholesaleVariantSelector";
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

  console.log("controller", controller)
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
            bg="white"
            my={6}
            p={6}
            width="100%"
            borderRadius="xl"
            boxShadow="sm"
            borderWidth="1px"
            borderColor="gray.100"
          >
            <VStack spacing={6} align="stretch">
              <Flex justify="space-between" align="center">
                <Heading size="md" color="gray.700">Detalles del producto</Heading>
                
              </Flex>
              
              <SimpleGrid columns={{base: 1, sm: 2}} spacing={4}>
                <Box 
                  p={4} 
                  bg="gray.50" 
                  borderRadius="lg"
                  transition="all 0.2s"
                  _hover={{ bg: "pink.50" }}
                >
                  <Text fontWeight="semibold" color="gray.500" fontSize="sm" mb={1}>
                    Marca
                  </Text>
                  <Text color="gray.800" fontSize="md">
                    {capitalizeFirstLetter(controller.productDetail?.attributes.brand)}
                  </Text>
                </Box>

                <Box 
                  p={4} 
                  bg="gray.50" 
                  borderRadius="lg"
                  transition="all 0.2s"
                  _hover={{ bg: "pink.50" }}
                >
                  <Text fontWeight="semibold" color="gray.500" fontSize="sm" mb={1}>
                    Talles disponibles
                  </Text>
                  <Flex gap={2} flexWrap="wrap">
                    {controller.productDetail?.sizes.map((size, index) => (
                      <Badge 
                        key={index}
                        colorScheme="gray"
                        px={2}
                        py={1}
                        borderRadius="md"
                      >
                        {size}
                      </Badge>
                    ))}
                  </Flex>
                </Box>

                <Box 
                  p={4} 
                  bg="gray.50" 
                  borderRadius="lg"
                  transition="all 0.2s"
                  _hover={{ bg: "pink.50" }}
                >
                  <Text fontWeight="semibold" color="gray.500" fontSize="sm" mb={1}>
                    Colores disponibles
                  </Text>
                  <Flex gap={2} flexWrap="wrap">
                    {controller.colorsProduct.map((color, index) => (
                      <Badge 
                        key={index}
                        colorScheme="gray"
                        px={2}
                        py={1}
                        borderRadius="md"
                      >
                        {color.label}
                      </Badge>
                    ))}
                  </Flex>
                </Box>

                <Box 
                  p={4} 
                  bg="gray.50" 
                  borderRadius="lg"
                  transition="all 0.2s"
                  _hover={{ bg: "pink.50" }}
                >
                  <Text fontWeight="semibold" color="gray.500" fontSize="sm" mb={1}>
                    Artículo
                  </Text>
                  <HStack spacing={2} mt={1}>
                    <Badge colorScheme="pink" variant="subtle">
                    {controller.productDetail?.code}
                    </Badge>
                  </HStack>
                </Box>

                <Box 
                  p={4} 
                  bg="gray.50" 
                  borderRadius="lg"
                  transition="all 0.2s"
                  _hover={{ bg: "pink.50" }}
                  gridColumn={{base: "auto", sm: "1 / -1"}}
                >
                  <Text fontWeight="semibold" color="gray.500" fontSize="sm" mb={2}>
                    Características y descripción
                  </Text>
                  <Text color="gray.700" fontSize="md" mb={3} lineHeight="tall">
                    {capitalizeFirstLetter(controller.productDetail?.description)}
                  </Text>
                </Box>
              </SimpleGrid>
            </VStack>
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
              <HStack spacing={4} align="baseline" flexDirection={{
                base: "column",
                md: "row"
              }}>
                <Heading color="pink.500" fontSize="2xl">
                  {formattedNumberToMoney(controller.productDetail?.prices.retail)}
                </Heading>
                {controller.productDetail?.wholesaleData?.isWholesaler ? (
                  <Badge colorScheme="purple" fontSize="md" p={2} borderRadius="md">
                    Precio Mayorista: {formattedNumberToMoney(controller.productDetail?.prices.reseller)}
                  </Badge>
                ) : (
                  <Badge colorScheme="red" fontSize="md" p={2} borderRadius="md">
                    -30% a partir de 2da pieza 🔥
                  </Badge>
                )}
              </HStack>
              {controller.productDetail?.wholesaleData?.isWholesaler && (
                <Box mt={4} p={4} bg="purple.50" borderRadius="lg" borderWidth="1px" borderColor="purple.200">
                  <HStack spacing={4} align="center" mb={2}>
                    <Switch
                      isChecked={controller.isWholesaleEnabled}
                      onChange={controller.handleWholesaleToggle}
                      colorScheme="purple"
                      size="lg"
                    />
                    <Text fontWeight="bold" fontSize="lg">Modo Mayorista</Text>
                  </HStack>
                  {controller.isWholesaleEnabled ? (
                    <VStack align="start" spacing={2}>
                      <Text color="purple.700">
                        • Mínimo {controller.minimumQuantity} unidades
                      </Text>
                      <Text color="purple.700">
                        • Cantidades en docenas (6 unidades o múltiplos de 12)
                      </Text>
                      <Text color="purple.700">
                        • Precio especial por volumen
                      </Text>
                    </VStack>
                  ) : (
                    <Text color="purple.700">
                      Activa el modo mayorista para acceder a precios especiales por volumen
                    </Text>
                  )}
                </Box>
              )}
            </Box>
            <Divider
              my={5}
              display={{
                base: "none",
                lg: "flex"
              }}
            />

            <Flex
              gap={8}
              flexDirection={"column"}
            >
              {controller.isWholesale ? (
                <>
                  <Box bg="purple.50" p={6} borderRadius="lg" borderWidth="1px" borderColor="purple.200">
                    <VStack align="stretch" spacing={4}>
                      <Box>
                        <Text fontWeight="bold" mb={2}>Cantidad total (en docenas) <Text fontSize="sm" color="purple.700" mt={2}>{controller.totalDozens} docenas disponibles</Text></Text>
                        <QuantityPicker
                          stock={controller.totalDozens || 0}
                          quantity={controller.quantity}
                          onIncrease={controller.onIncrease}
                          onDecrease={controller.onDecrease}
                          isDisabled={false}
                          isWholesale={controller.isWholesale}
                          minimumQuantity={controller.minimumQuantity}
                        />
                        <Text fontSize="sm" color="purple.700" mt={2}>
                          Total: {controller.quantity * 12} unidades
                        </Text>
                      </Box>
                      <Box>
                        <Text fontWeight="bold" mb={4}>Distribuir cantidades por variante</Text>
                        <WholesaleVariantSelector
                          colors={controller.colorsProduct}
                          sizes={controller.sizes}
                          stocks={controller.productDetail?.stocks || []}
                          totalQuantity={controller.quantity * 12}
                          onVariantsChange={controller.handleVariantsChange}
                          isDisabled={false}
                        />
                      </Box>
                      <Button
                        isDisabled={controller.isDisabledButton}
                        w={"full"}
                        colorScheme={'purple'}
                        size="lg"
                        onClick={controller.onAddToCartWholesalePressed}
                      >
                        Agregar al carrito mayorista
                      </Button>
                    </VStack>
                  </Box>
                </>
              ) : (
                <>
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
                    <Box flex={1}>
                      <Text fontWeight="bold" mb={2}>Cantidad</Text>
                      <QuantityPicker
                        stock={controller.variantSelected?.quantity || 0}
                        quantity={controller.quantity}
                        onIncrease={controller.onIncrease}
                        onDecrease={controller.onDecrease}
                        isDisabled={false}
                        isWholesale={controller.isWholesale}
                        minimumQuantity={controller.minimumQuantity}
                      />
                    </Box>
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
                </>
              )}
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
