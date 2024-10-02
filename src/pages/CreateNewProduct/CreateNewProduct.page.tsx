import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { FC } from 'react';
import { CreateNewProductProps } from './interfaces';
import { useCreateNewProductController } from './CreateNewProduct.controller';
import Modal from '../../components/Modal/Modal';



const CreateNewProduct: FC<CreateNewProductProps> = (props) => {
  const controller = useCreateNewProductController();
  return (
    <Box
      // maxW="sm"
      mx="auto"
      p={6}
      bg="gray.50"
      borderRadius="lg"
      boxShadow="lg"
      as="form"
      onSubmit={controller.handleSubmit}
    >
      <Box fontSize="2xl" fontWeight="bold" mb={6} textAlign="center">
        Add New Product
      </Box>

      {/* Article Field */}
      <FormControl mb={4}>
        <FormLabel htmlFor="article">Article</FormLabel>
        <Input
          id="article"
          name="article"
          value={controller.formData.article}
          onChange={controller.handleChange}
          required
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          id="name"
          name="name"
          value={controller.formData.name}
          onChange={controller.handleChange}
          required
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel htmlFor="brand">Brand</FormLabel>
        <Select
          options={controller.brands}
          onChange={(option) => controller.handleSelectChange(option, 'brand')}
          placeholder="Select a brand"
          isSearchable
        />
        <Button mt={2} size="sm" onClick={controller.onBrandOpen}>
          Add New Brand
        </Button>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Textarea
          id="description"
          name="description"
          value={controller.formData.description}
          onChange={controller.handleChange}
          required
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel htmlFor="size">Size Type</FormLabel>
        <Select
          options={controller.sizes}
          onChange={(option) => controller.handleSelectChange(option, 'size')}
          placeholder="Select a size"
          isSearchable
        />
        <Button mt={2} size="sm" onClick={controller.onSizeOpen}>
          Add New Size Type
        </Button>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel htmlFor="colors">Colors</FormLabel>
        <Select
          isMulti
          options={controller.colors}
          onChange={controller.handleColorsChange}
          placeholder="Select colors"
          isSearchable
        />
        <Button mt={2} size="sm" onClick={controller.onColorOpen}>
          Add New Color
        </Button>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel htmlFor="costPrice">Cost Price</FormLabel>
        <Input
          type="number"
          id="costPrice"
          name="costPrice"
          value={controller.formData.costPrice}
          onChange={controller.handleNumberChange}
          required
          min={0}
          step="0.01"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel htmlFor="finalPrice">Final Price</FormLabel>
        <Input
          type="number"
          id="finalPrice"
          name="finalPrice"
          value={controller.formData.finalPrice}
          onChange={controller.handleNumberChange}
          required
          min={0}
          step="0.01"
        />
      </FormControl>

      {/* Upload Photos Field */}
      <FormControl mb={4}>
        <FormLabel htmlFor="photos">Upload Photos</FormLabel>
        <Input
          type="file"
          id="photos"
          accept="image/*"
          multiple
          onChange={controller.handleFileChange}
        />
      </FormControl>

      <Button type="submit" colorScheme="blue" width="full" mt={4}>
        Add Product
      </Button>

      {/* Modals */}
      <Modal title='New Brand' onSubmit={controller.addBrand} isOpen={controller.isBrandOpen} onClose={controller.onBrandClose}>
        <Input
          placeholder="New Brand"
          value={controller.newBrand}
          onChange={(e) => controller.setNewBrand(e.target.value)}
        />
      </Modal>

      <Modal title='Add New Size' onSubmit={controller.addSize} isOpen={controller.isSizeOpen} onClose={controller.onSizeClose}>
        <Input
          placeholder="New Size"
          value={controller.newSize}
          onChange={(e) => controller.setNewSize(e.target.value)}
        />
      </Modal>

      <Modal title='Add New Color' onSubmit={controller.addColor} isOpen={controller.isColorOpen} onClose={controller.onColorClose}>
        <Input
          placeholder="New Color"
          value={controller.newColor}
          onChange={(e) => controller.setNewColor(e.target.value)}
        />
      </Modal>
    </Box>
  );
};

export default CreateNewProduct;
