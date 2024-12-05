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
} from '@chakra-ui/react';
import { FC } from 'react';
import { CreateNewProductProps } from './interfaces';
import { useCreateNewProductController } from './CreateNewProduct.controller';
import ImageUploadGallery from '../../components/ImageUploadGallery/ImageUploadGallery';
import CategoryList from '../../components/CategoryList/CategoryList';
import { capitalizeFirstLetter, formattedNumberToMoney } from '../../utils/functions';

const CreateNewProduct: FC<CreateNewProductProps> = (props) => {
  const controller = useCreateNewProductController();
  // Responsive padding and font sizes
  const padding = useBreakpointValue({ base: '4', md: '6' });
  const headingSize = useBreakpointValue({ base: 'lg', md: '2xl' });

  return (
    <Box
      width={{ base: '100%', md: '80%' }}
      maxWidth="900px"
      mx="auto"
      p={padding}
      bg="gray.800"
      borderRadius="lg"
      boxShadow="lg"
      as="form"
      onSubmit={controller.handleSubmit}
      my={10}
      color={"gray.100"}
    >
      {/* Heading */}
      <Heading fontSize={headingSize} fontWeight="bold" mb={6} textAlign="center">
        Nuevo Producto
      </Heading>

      <VStack spacing={4}>
        {/* Article Field */}
        <FormControl isRequired>
          <FormLabel htmlFor="article">Artículo</FormLabel>
          <Input
            id="article"
            name="article"
            value={controller.formData.code}
            onChange={controller.handleChangeCode}
            placeholder="Introduce el artículo"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="name">Nombre</FormLabel>
          <Input
            id="name"
            name="name"
            value={controller.formData.name}
            onChange={controller.handleChange}
            placeholder="Introduce el nombre"
          />
        </FormControl>
        <FormControl color="white" isRequired>
          <FormLabel htmlFor="category">Categoria</FormLabel>
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
          <CategoryList colorText='gray.100' categorySelected={controller.categorySelected?.id} categories={controller.currentCategories} onCategorySelect={controller.handleCategorySelect} />
        </FormControl>
          <FormControl>
            <Box>
              <FormLabel htmlFor="sizes">Tipo de talle</FormLabel>
              {controller.sizesTypes.map((sizetype) => (
                <RadioGroup defaultValue=''>
                  <Stack onClick={() => controller.onSelectSizeType(sizetype._id)} spacing={5}>
                    <Radio
                      isChecked={controller.formData.sizeType === sizetype._id}
                      colorScheme='pink'
                    >
                      <Text>{capitalizeFirstLetter(sizetype.label || sizetype.value)}</Text>
                    </Radio>
                  </Stack>
                </RadioGroup>
              ))}
            </Box>
          </FormControl>
        <FormControl>
          <Box>
            <FormLabel htmlFor="brands">Marca</FormLabel>
            <SimpleGrid columns={{ base: 2, md: 3 }}>
              {controller.allBrands.map((brand, index) => (
                <RadioGroup key={index} defaultValue=''>
                  <Stack onClick={() => controller.handleChangeBrand(brand.value)} spacing={5}>
                    <Radio
                      // onClick={() => controller.handleChangeBrand(brand.value)}
                      isChecked={controller.formData.attributes.brand === brand.value}
                      colorScheme='pink'
                    >
                      <Text >{capitalizeFirstLetter(brand.label)}</Text>
                    </Radio>
                  </Stack>
                </RadioGroup>
              ))}
            </SimpleGrid>
          </Box>
        </FormControl>
        {/* Description Field */}
        <FormControl isRequired>
          <FormLabel htmlFor="description">Descripción</FormLabel>
          <Textarea
            id="description"
            name="description"
            value={controller.formData.description}
            onChange={controller.handleChange}
            placeholder="Escribe la descripción del producto"
          />
        </FormControl>
        <FormControl >
          <FormLabel htmlFor="colors">Colores</FormLabel>
          <Checkbox
            isChecked={controller.selectedColors.length === controller.colors.length}
            onChange={controller.onSelectAllColors}
          ><Text >Seleccionar todos</Text></Checkbox>
          <SimpleGrid columns={{ base: 2, md: 3 }} >
            {controller.colors.map(({ label, value }) => (
              <Flex cursor={"pointer"} onClick={() => controller.handleColorChange(value)}  alignItems={"center"} gap={2} key={value}>
                <input
                  type='checkbox'
                  checked={controller.selectedColors.includes(value)}
                />
                <Text>{label}</Text>
              </Flex>
            ))}
          </SimpleGrid>
        </FormControl>


        {/* Cost Price Field */}
        <FormControl isRequired>
          <FormLabel htmlFor="costPrice">Precio de Costo</FormLabel>
          <Input
            type="number"
            id="costPrice"
            name="costPrice"
            value={controller.formData.prices.cost}
            onChange={controller.handleChangeCostPrice}
            placeholder="Introduce el precio de costo"
            min={0}
          // step="0.01"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="percentageReseller">Porcentaje Revendedor</FormLabel>
          <Input
            type="number"
            id="percentageReseller"
            name="percentageReseller"
            value={controller.formData.percentages.reseller}
            onChange={controller.handleChangePercentageReseller}
            min={0}
          // step="0.01"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="percentageRetail">Porcentaje Venta</FormLabel>
          <Input
            type="number"
            id="percentageRetail"
            name="percentageRetail"
            value={controller.formData.percentages.retail}
            onChange={controller.handleChangePercentageRetail}
            min={0}
            placeholder='Porcentaje de venta SOBRE REVENDEDOR'
          // step="0.01"
          />
        </FormControl>
        <Box display={"flex"} flexDirection={'column'} gap={4} w={"100%"}>
          <Box>
            <FormLabel color={"green.600"} htmlFor="retailPrice">Precio Revendedor</FormLabel>
            <Text color={"green.400"} fontWeight={"bold"}>{formattedNumberToMoney(controller.formData.prices?.reseller || 0)}</Text>
          </Box>
          <Box>
            <FormLabel color={"orange.600"} htmlFor="retailPrice">Precio Venta</FormLabel>
            <Text color={"orange.400"} fontWeight={"bold"}>{formattedNumberToMoney(controller.formData.prices?.retail || 0)}</Text>
          </Box>
        </Box>
        <ImageUploadGallery
          setImages={controller.setImages}
          images={controller.images}
        />

        {/* Submit Button */}
        <Button isDisabled={controller.isDisabledButtonSubmit} type="submit" isLoading={controller.isLoading} colorScheme="blue" width="full" mt={4}>
          Añadir Producto
        </Button>
      </VStack>

      {/* Modals */}
    </Box>
  );
};

export default CreateNewProduct;
