import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Heading,
  useBreakpointValue,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Checkbox,
  Text,
  RadioGroup,
  Stack,
  Radio,
  SimpleGrid,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Badge,
  Divider,
  Card,
  CardBody,
  Icon,
  Tooltip,
  useColorModeValue,
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { CreateNewProductProps } from './interfaces';
import { useCreateNewProductController } from './CreateNewProduct.controller';
import ImageUploadGallery from '../../components/ImageUploadGallery/ImageUploadGallery';
import CategoryList from '../../components/CategoryList/CategoryList';
import { capitalizeFirstLetter, formattedNumberToMoney } from '../../utils/functions';
import { useLocation } from 'react-router-dom';
import { FaInfoCircle, FaTag, FaMoneyBillWave, FaPalette, FaRuler, FaImage, FaSave } from 'react-icons/fa';

const CreateNewProduct: FC<CreateNewProductProps> = (props) => {
  const location = useLocation();
  const product = location.state?.product;

  const controller = useCreateNewProductController({ product });
  // Responsive padding and font sizes
  const padding = useBreakpointValue({ base: '4', md: '6' });
  const headingSize = useBreakpointValue({ base: 'lg', md: '2xl' });
  const [activeTab, setActiveTab] = useState(0);

  const texts = {
    title: product ? 'Editar Producto' : 'Crear producto',
    button: product ? 'Guardar cambios' : 'Crear producto',
  }

  // Colores para el tema
  const bgColor = useColorModeValue('white', 'gray.800');
  const cardBgColor = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const accentColor = useColorModeValue('blue.500', 'blue.300');
  const hoverBgColor = useColorModeValue('gray.50', 'gray.600');

  return (
    <Box
      width={{ base: '100%', md: '90%' }}
      maxWidth="1200px"
      mx="auto"
      p={padding}
      bg={bgColor}
      borderRadius="xl"
      boxShadow="xl"
      as="form"
      onSubmit={controller.handleSubmit}
      my={10}
      color={textColor}
    >
      {/* Heading */}
      <Flex direction="column" align="center" mb={8}>
        <Heading fontSize={headingSize} fontWeight="bold" textAlign="center">
          {texts.title}
        </Heading>
        <Text mt={2} color="gray.500">Complete todos los campos requeridos para {product ? 'actualizar' : 'crear'} el producto</Text>
      </Flex>

      <Tabs 
        variant="enclosed" 
        colorScheme="blue" 
        onChange={(index) => setActiveTab(index)}
        isLazy
      >
        <TabList mb="1em" overflowX="auto" whiteSpace="nowrap">
          <Tab><Icon as={FaTag} mr={2} />Información Básica</Tab>
          <Tab><Icon as={FaRuler} mr={2} />Talles y Marca</Tab>
          <Tab><Icon as={FaPalette} mr={2} />Colores</Tab>
          <Tab><Icon as={FaMoneyBillWave} mr={2} />Precios</Tab>
          <Tab><Icon as={FaImage} mr={2} />Imágenes</Tab>
        </TabList>

        <TabPanels>
          {/* Panel 1: Información Básica */}
          <TabPanel>
            <VStack spacing={6} align="stretch">
              <Card bg={cardBgColor} borderRadius="lg" boxShadow="md">
                <CardBody>
                  <Heading size="md" mb={4}>Detalles del Producto</Heading>
                  
                  <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel htmlFor="article">
                          Artículo <Badge colorScheme="red" ml={1}>Requerido</Badge>
                        </FormLabel>
                        <Input
                          id="article"
                          name="article"
                          value={controller.formData.code}
                          onChange={controller.handleChangeCode}
                          placeholder="Introduce el artículo"
                          size="md"
                        />
                      </FormControl>
                    </GridItem>
                    
                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel htmlFor="name">
                          Nombre <Badge colorScheme="red" ml={1}>Requerido</Badge>
                        </FormLabel>
                        <Input
                          id="name"
                          name="name"
                          value={controller.formData.name}
                          onChange={controller.handleChange}
                          placeholder="Introduce el nombre"
                          size="md"
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>

                  <Box mt={6}>
                    <FormControl isRequired>
                      <FormLabel htmlFor="description">
                        Descripción <Badge colorScheme="red" ml={1}>Requerida</Badge>
                      </FormLabel>
                      <Textarea
                        id="description"
                        name="description"
                        value={controller.formData.description}
                        onChange={controller.handleChange}
                        placeholder="Escribe la descripción del producto"
                        size="md"
                        minH="120px"
                      />
                    </FormControl>
                  </Box>
                </CardBody>
              </Card>

              <Card bg={cardBgColor} borderRadius="lg" boxShadow="md">
                <CardBody>
                  <Heading size="md" mb={4}>Categoría</Heading>
                  <FormControl color="white" isRequired>
                    <FormLabel htmlFor="category">
                      Categoría <Badge colorScheme="red" ml={1}>Requerida</Badge>
                    </FormLabel>
                    <Box p={4} bg="gray.700" borderRadius="md" mb={4}>
                      <Breadcrumb separator=" / ">
                        <BreadcrumbItem>
                          <BreadcrumbLink onClick={controller.onPressedStartCategories}>
                            Inicio
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        {controller.selectedPath.map((category, index) => (
                          <BreadcrumbItem key={category.id}>
                            <BreadcrumbLink
                              borderWidth={controller.categorySelected?.id === category.id ? 2 : 0}
                              borderColor={"pink.100"}
                              px={2}
                              borderRadius={"md"}
                              onClick={() => controller.handleBreadcrumbClick(category, index)}>
                              {category.name}
                            </BreadcrumbLink>
                          </BreadcrumbItem>
                        ))}
                      </Breadcrumb>
                    </Box>
                    <CategoryList 
                      colorText='gray.100' 
                      categorySelected={controller.categorySelected?.id} 
                      categories={controller.currentCategories} 
                      onCategorySelect={controller.handleCategorySelect} 
                    />
                  </FormControl>
                </CardBody>
              </Card>
            </VStack>
          </TabPanel>

          {/* Panel 2: Talles y Marca */}
          <TabPanel>
            <VStack spacing={6} align="stretch">
              <Card bg={cardBgColor} borderRadius="lg" boxShadow="md">
                <CardBody>
                  <Heading size="md" mb={4}>Tipo de Talle</Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    {controller.sizesTypes.map((sizetype) => (
                      <Box 
                        key={sizetype._id}
                        p={4} 
                        borderWidth="1px" 
                        borderRadius="md" 
                        borderColor={controller.formData.sizeType === sizetype._id ? accentColor : borderColor}
                        cursor="pointer"
                        onClick={() => controller.onSelectSizeType(sizetype._id)}
                        _hover={{ bg: hoverBgColor }}
                      >
                        <Radio
                          isChecked={controller.formData.sizeType === sizetype._id}
                          colorScheme='blue'
                        >
                          <Text fontWeight="medium">{capitalizeFirstLetter(sizetype.label || sizetype.value)}</Text>
                        </Radio>
                      </Box>
                    ))}
                  </SimpleGrid>
                </CardBody>
              </Card>

              <Card bg={cardBgColor} borderRadius="lg" boxShadow="md">
                <CardBody>
                  <Heading size="md" mb={4}>Marca</Heading>
                  <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4}>
                    {controller.allBrands.map((brand, index) => (
                      <Box 
                        key={index}
                        p={4} 
                        borderWidth="1px" 
                        borderRadius="md" 
                        borderColor={controller.formData.attributes.brand === brand.value ? accentColor : borderColor}
                        cursor="pointer"
                        onClick={() => controller.handleChangeBrand(brand.value)}
                        _hover={{ bg: hoverBgColor }}
                      >
                        <Radio
                          isChecked={controller.formData.attributes.brand === brand.value}
                          colorScheme='blue'
                        >
                          <Text fontWeight="medium">{capitalizeFirstLetter(brand.label)}</Text>
                        </Radio>
                      </Box>
                    ))}
                  </SimpleGrid>
                </CardBody>
              </Card>
            </VStack>
          </TabPanel>

          {/* Panel 3: Colores */}
          <TabPanel>
            <Card bg={cardBgColor} borderRadius="lg" boxShadow="md">
              <CardBody>
                <Heading size="md" mb={4}>Colores Disponibles</Heading>
                <Checkbox
                  isChecked={controller.selectedColors.length === controller.colors.length}
                  onChange={controller.onSelectAllColors}
                  mb={4}
                  colorScheme="blue"
                >
                  <Text fontWeight="medium">Seleccionar todos</Text>
                </Checkbox>
                
                <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={4}>
                  {controller.colors.map(({ label, value }) => (
                    <Box 
                      key={value}
                      p={3} 
                      borderWidth="1px" 
                      borderRadius="md" 
                      borderColor={controller.selectedColors.includes(value) ? accentColor : borderColor}
                      cursor="pointer"
                      onClick={() => controller.handleColorChange(value)}
                      _hover={{ bg: hoverBgColor }}
                    >
                      <Flex alignItems="center" gap={3}>
                        <Box 
                          w="24px" 
                          h="24px" 
                          borderRadius="full" 
                          bg={value} 
                          borderWidth="1px" 
                          borderColor="gray.300"
                        />
                        <Checkbox
                          isChecked={controller.selectedColors.includes(value)}
                          colorScheme="blue"
                        >
                          <Text>{label}</Text>
                        </Checkbox>
                      </Flex>
                    </Box>
                  ))}
                </SimpleGrid>
              </CardBody>
            </Card>
          </TabPanel>

          {/* Panel 4: Precios */}
          <TabPanel>
            <VStack spacing={6} align="stretch">
              <Card bg={cardBgColor} borderRadius="lg" boxShadow="md">
                <CardBody>
                  <Heading size="md" mb={4}>Configuración de Precios</Heading>
                  
                  <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel htmlFor="costPrice">
                          Precio de Costo <Badge colorScheme="red" ml={1}>Requerido</Badge>
                        </FormLabel>
                        <InputGroup>
                          <InputLeftElement pointerEvents="none">
                            <FaMoneyBillWave color="gray.300" />
                          </InputLeftElement>
                          <Input
                            type="number"
                            id="costPrice"
                            name="costPrice"
                            value={controller.formData.prices.cost}
                            onChange={controller.handleChangeCostPrice}
                            placeholder="0.00"
                            min={0}
                            pl={10}
                          />
                        </InputGroup>
                      </FormControl>
                    </GridItem>
                    
                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel htmlFor="percentageReseller">
                          % Revendedor <Badge colorScheme="red" ml={1}>Requerido</Badge>
                        </FormLabel>
                        <InputGroup>
                          <Input
                            type="number"
                            id="percentageReseller"
                            name="percentageReseller"
                            value={controller.formData.percentages.reseller}
                            onChange={controller.handleChangePercentageReseller}
                            min={0}
                            placeholder="0"
                          />
                          <InputRightElement>
                            <Text color="gray.500">%</Text>
                          </InputRightElement>
                        </InputGroup>
                      </FormControl>
                    </GridItem>
                    
                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel htmlFor="percentageRetail">
                          % Venta <Badge colorScheme="red" ml={1}>Requerido</Badge>
                        </FormLabel>
                        <InputGroup>
                          <Input
                            type="number"
                            id="percentageRetail"
                            name="percentageRetail"
                            value={controller.formData.percentages.retail}
                            onChange={controller.handleChangePercentageRetail}
                            min={0}
                            placeholder="0"
                          />
                          <InputRightElement>
                            <Text color="gray.500">%</Text>
                          </InputRightElement>
                        </InputGroup>
                        <Text fontSize="xs" color="gray.500" mt={1}>
                          Porcentaje de venta SOBRE REVENDEDOR
                        </Text>
                      </FormControl>
                    </GridItem>
                  </Grid>
                </CardBody>
              </Card>

              <Card bg={cardBgColor} borderRadius="lg" boxShadow="md">
                <CardBody>
                  <Heading size="md" mb={4}>Resumen de Precios</Heading>
                  
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                    <Stat p={4} bg="green.50" borderRadius="md" borderWidth="1px" borderColor="green.200">
                      <StatLabel color="green.700">Precio Revendedor</StatLabel>
                      <StatNumber color="green.600" fontSize="2xl">
                        {formattedNumberToMoney(controller.formData.prices?.reseller || 0)}
                      </StatNumber>
                      <StatHelpText color="green.500">
                        Precio calculado para revendedores
                      </StatHelpText>
                    </Stat>
                    
                    <Stat p={4} bg="orange.50" borderRadius="md" borderWidth="1px" borderColor="orange.200">
                      <StatLabel color="orange.700">Precio Venta</StatLabel>
                      <StatNumber color="orange.600" fontSize="2xl">
                        {formattedNumberToMoney(controller.formData.prices?.retail || 0)}
                      </StatNumber>
                      <StatHelpText color="orange.500">
                        Precio final al público
                      </StatHelpText>
                    </Stat>
                  </SimpleGrid>
                </CardBody>
              </Card>
            </VStack>
          </TabPanel>

          {/* Panel 5: Imágenes */}
          <TabPanel>
            <Card bg={cardBgColor} borderRadius="lg" boxShadow="md">
              <CardBody>
                <Heading size="md" mb={4}>Galería de Imágenes</Heading>
                <Text mb={4}>Sube las imágenes del producto. Puedes arrastrar y soltar o hacer clic para seleccionar.</Text>
                <ImageUploadGallery
                  setImages={controller.setImages}
                  images={controller.images}
                />
              </CardBody>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Botón de envío fijo en la parte inferior */}
      <Box 
        position="sticky" 
        bottom={0} 
        bg={bgColor} 
        p={4} 
        borderTopWidth="1px" 
        borderColor={borderColor}
        mt={6}
        borderRadius="0 0 xl xl"
        boxShadow="0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)"
      >
        <Flex justify="space-between" align="center">
          <Text fontSize="sm" color="gray.500">
            {activeTab === 0 ? 'Información Básica' : 
             activeTab === 1 ? 'Talles y Marca' : 
             activeTab === 2 ? 'Colores' : 
             activeTab === 3 ? 'Precios' : 'Imágenes'}
          </Text>
          <Button 
            isDisabled={controller.isDisabledButtonSubmit} 
            type="submit" 
            isLoading={controller.isLoading} 
            colorScheme="blue" 
            size="lg"
            leftIcon={<FaSave />}
          >
            {texts.button}
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default CreateNewProduct;
