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
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { FC, useState } from 'react';
import { CreateNewProductProps } from './interfaces';
import { useCreateNewProductController } from './CreateNewProduct.controller';
import Modal from '../../components/Modal/Modal';
import { FilePond } from 'react-filepond';
import ReactImageUploading from 'react-images-uploading';
import ImageUploadGallery from '../../components/ImageUploadGallery/ImageUploadGallery';

const CreateNewProduct: FC<CreateNewProductProps> = (props) => {
  const controller = useCreateNewProductController();
  const [images, setImages] = useState([]);


  // Responsive padding and font sizes
  const padding = useBreakpointValue({ base: '4', md: '6' });
  const headingSize = useBreakpointValue({ base: 'lg', md: '2xl' });


  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  console.log({ images });
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
            onChange={controller.handleChange}
            placeholder="Introduce el artículo"
          />
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

        {/* Brand Select */}
        <FormControl>
          <FormLabel htmlFor="brand">Marca</FormLabel>
          <Select
            options={controller.brands}
            onChange={(option) => controller.handleSelectChange(option, 'brand')}
            placeholder="Selecciona una marca"
            isSearchable
          />
          <Button mt={2} size="sm" onClick={controller.onBrandOpen} colorScheme="blue">
            Añadir Marca
          </Button>
        </FormControl>
        <FormControl>
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

        {/* Size Select */}
        <FormControl>
          <FormLabel htmlFor="size">Tipos de Talle</FormLabel>
          <Select
            options={controller.sizes}
            onChange={(option) => controller.handleSelectChange(option, 'size')}
            placeholder="Selecciona un tipo de talle"
            isSearchable
          />
          <Button mt={2} size="sm" onClick={controller.onSizeOpen} colorScheme="blue">
            Añadir Talle
          </Button>
        </FormControl>

        {/* Color Select */}
        <FormControl>
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
        </FormControl>

        {/* Cost Price Field */}
        {/* <FormControl isRequired>
          <FormLabel htmlFor="costPrice">Precio de Costo</FormLabel>
          <Input
            type="number"
            id="costPrice"
            name="costPrice"
            value={controller.formData.prices.retail}
            onChange={controller.handleNumberChange}
            placeholder="Introduce el precio de costo"
            min={0}
            step="0.01"
          />
        </FormControl> */}

        {/* Final Price Field */}
        <FormControl isRequired>
          <FormLabel htmlFor="finalPrice">Precio Final</FormLabel>
          <Input
            type="number"
            id="finalPrice"
            name="finalPrice"
            value={controller.formData.prices.reseller}
            onChange={controller.handleNumberChange}
            placeholder="Introduce el precio final"
            min={0}
            step="0.01"
          />
        </FormControl>

        <ImageUploadGallery/>

        {/* Submit Button */}
        <Button type="submit" isLoading={controller.isLoading} colorScheme="blue" width="full" mt={4}>
          Añadir Producto
        </Button>
      </VStack>

      {/* Modals */}
      <Modal title="Nueva Marca" onSubmit={controller.addBrand} isOpen={controller.isBrandOpen} onClose={controller.onBrandClose}>
        <Input
          placeholder="Nueva Marca"
          value={controller.newBrand}
          onChange={(e) => controller.setNewBrand(e.target.value)}
        />
      </Modal>

      <Modal title="Añadir Talle" onSubmit={controller.addSize} isOpen={controller.isSizeOpen} onClose={controller.onSizeClose}>
        <Input
          placeholder="Nuevo Talle"
          value={controller.newSize}
          onChange={(e) => controller.setNewSize(e.target.value)}
        />
      </Modal>

      <Modal title="Añadir Color" onSubmit={controller.addColor} isOpen={controller.isColorOpen} onClose={controller.onColorClose}>
        <Input
          placeholder="Nuevo Color"
          value={controller.newColor}
          onChange={(e) => controller.setNewColor(e.target.value)}
        />
      </Modal>
    </Box>
  );
};

export default CreateNewProduct;
