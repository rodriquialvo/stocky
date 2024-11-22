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
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { FC, useState } from 'react';
import { CreateNewProductProps } from './interfaces';
import { useCreateNewProductController } from './CreateNewProduct.controller';
import Modal from '../../components/Modal/Modal';
import ImageUploadGallery from '../../components/ImageUploadGallery/ImageUploadGallery';
import CategoryList, { Category } from '../../components/CategoryList/CategoryList';
import ColorsSelector from '../../components/ColorsSelector/ColorsSelector';
import ItemsSelector from '../../components/SizesSelector/SizesSelector';

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
      bg="gray.100"
      borderRadius="lg"
      boxShadow="lg"
      as="form"
      onSubmit={controller.handleSubmit}
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
                  borderWidth={controller.categorySelected === category.id ? 2 : 0}
                  borderColor={"pink.100"}
                  px={2}
                  borderRadius={"md"}
                  onClick={() => controller.handleBreadcrumbClick(category, index)}>
                  {category.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            ))}
          </Breadcrumb>

          <CategoryList categorySelected={controller.categorySelected} categories={controller.currentCategories} onCategorySelect={controller.handleCategorySelect} />

        </FormControl>


        {/* Name Field */}
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
        <FormControl isRequired>
          <FormLabel htmlFor="name">Marca</FormLabel>
          <Input
            id="brand"
            name="brand"
            value={controller.formData.attributes.brand}
            onChange={controller.handleChangeBrand}
            placeholder="Introduce el nombre"
          />
        </FormControl>

        {/* <FormControl>
          <FormLabel htmlFor="categorie">Categoria</FormLabel>
          <Select
            options={controller.categories}
            onChange={(option) => controller.handleSelectChange(option, 'categorie')}
            placeholder="Selecciona una Categoria"
            isSearchable
            isMulti
          />
          <Button mt={2} size="sm" onClick={controller.onBrandOpen} colorScheme="blue">
            Añadir Categoria
          </Button>
        </FormControl> */}

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
          <ItemsSelector
            items={controller.colors}
            selectedItems={controller.selectedColors}
            setSelectedItems={controller.setSelectedColors}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="sizes">Talles</FormLabel>
          <ItemsSelector
            items={controller.sizesOptions}
            selectedItems={controller.selectedSizes}
            setSelectedItems={controller.setSelectedSizes}
          />
        </FormControl>
        {/* Color Select */}
        {/* <FormControl>
          <FormLabel htmlFor="colors">Colores</FormLabel>
          <Select
            isMulti
            options={controller.colors}
            onChange={controller.handleColorsChange}
            placeholder="Selecciona colores"
            isSearchable
          />
          <Button mt={2} size="sm" onClick={controller.onColorOpen} colorScheme="blue">
            Añadir Color
          </Button>
        </FormControl> */}

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
          // step="0.01"
          />
        </FormControl>

        <FormControl isDisabled={true}>
          <FormLabel htmlFor="resellerPrice">Precio Revendedor</FormLabel>
          <Input
            type="number"
            id="resellerPrice"
            name="resellerPrice"
            value={controller.formData.prices?.reseller || 0}
            min={0}
          />
        </FormControl>

        {/* Final Price Field */}
        <FormControl isDisabled={true}>
          <FormLabel htmlFor="retailPrice">Precio Venta</FormLabel>
          <Input
            type="number"
            id="retailPrice"
            name="retailPrice"
            value={controller.formData.prices?.retail || 0}
            min={0}
            step="0.01"
          />
        </FormControl>

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
