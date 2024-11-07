import { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  Grid,
  GridItem,
  Text,
  Button,
  Heading,
  List,
  ListItem,
} from '@chakra-ui/react';
import { useDebounce } from 'use-debounce';
import { ProductAction } from '../../store/product/actions';
import { useProductStore } from '../../store/product/slice';
import { mapColors } from '../../constants/maps';
import { PostStockDto } from '../../services/stock/dtos/generic';
import { StockAction } from '../../store/stock/actions';
import { useStockStore } from '../../store/stock/slice';
import toast from 'react-hot-toast';

export default function StockEntry() {
  const { getProductsByCodeOrName } = ProductAction();
  const { postStock } = StockAction();
  const productsByCodeOrName = useProductStore(state => state.productsByCodeOrName);
  const postStockStatus = useStockStore(state => state.postStockStatus);
  const postStockLoading = useStockStore(state => state.postStockLoading);
  const restoreStatusAndLoading = useStockStore(state => state.restoreStatusAndLoading);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');

  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [cost, setCost] = useState('');
  const [quantity, setQuantity] = useState('');

  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (debouncedSearchTerm && showDropdown) {
      getProductsByCodeOrName(searchTerm);
    }
  }, [debouncedSearchTerm]);

  const setDefaultValues = () => {
    setSelectedProduct(null);
    setSearchTerm('');
    setSelectedProduct(null);
    setSelectedColor('');
    setSelectedSize('');
    setCost('');
    setQuantity('');
    setShowDropdown(false);
  }

  useEffect(() => {
    if (postStockStatus.success) {
      setDefaultValues();
      toast.success('Stock agregado exitosamente');
      restoreStatusAndLoading();
    } else if (postStockStatus.error) {
      toast.error('Error al ingresar stock');
      restoreStatusAndLoading();
    }
  }, [postStockStatus]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  // set key id product and value the entire product
  const findProductById = (id: string) => {
    const product = productsByCodeOrName.find(product => product?.id === id);
    setSelectedProduct(product);
  }

  const onSubmit = () => {
    const formValues: PostStockDto = {
      product: selectedProduct?.id,
      variant: {
        color: selectedColor,
        size: selectedSize,
      },
      costPrice: Number(cost),
      quantity: Number(quantity),
    };

    postStock(formValues);
  }

  return (
    <Box
      maxW={{ base: '100%', md: '800px' }}
      mx="auto"
      mt={{ base: 4, md: 8 }}
      p={{ base: 8, md: 10 }}
      bg="white"
      boxShadow="2xl"
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.300"
    >
      <Heading size="xl" textAlign="center" mb={8} color="teal.600">
        Cargar Stock
      </Heading>

      <form onSubmit={handleFormSubmit}>
        <VStack spacing={6}>

          <Box position="relative" w="100%">
            <Text fontSize="md" mb={1}>Buscar y seleccionar producto</Text>
            <Input
              size="lg"
              placeholder="Escribe para buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              focusBorderColor="teal.400"
              onFocus={() => setShowDropdown(true)}
            />

            {showDropdown && productsByCodeOrName.length > 0 && (
              <List
                position="absolute"
                zIndex="dropdown"
                w="full"
                maxH="200px"
                overflowY="auto"
                mt={1}
                bg="white"
                boxShadow="md"
                borderRadius="md"
                border="1px solid"
                borderColor="gray.200"
              >
                {productsByCodeOrName
                  .map((product, index) => (
                    <ListItem
                      key={index}
                      px={4}
                      py={2}
                      cursor="pointer"
                      _hover={{ bg: 'teal.100' }}
                      onClick={() => {
                        findProductById(product?.id);
                        setSearchTerm(`${product.name} (${product.code})`);
                        setShowDropdown(false);
                      }}
                    >
                      {product.name} ({product.code})
                    </ListItem>
                  ))}
              </List>
            )}
          </Box>

          {/* Grid para los campos de Color, Talle, Costo y Cantidad */}
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6} w="100%">

            {/* Dropdown de Colores */}
            <GridItem>
              <Text fontSize="md" mb={1}>Color</Text>
              <Select
                placeholder="Seleccionar color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                size="lg"
                focusBorderColor="teal.400"
              >
                {selectedProduct?.colors.map((color) => (
                  <option key={color} value={color}>
                    {mapColors[color]}
                  </option>
                ))}
              </Select>
            </GridItem>

            {/* Dropdown de Talles */}
            <GridItem>
              <Text fontSize="md" mb={1}>Talle</Text>
              <Select
                placeholder="Seleccionar talle"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                size="lg"
                focusBorderColor="teal.400"
              >
                {selectedProduct?.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </Select>
            </GridItem>

            {/* Campo Numérico para el Costo */}
            <GridItem>
              <Text fontSize="md" mb={1}>Costo</Text>
              <NumberInput
                value={cost}
                onChange={(valueString) => setCost(valueString)}
                min={0}
                focusBorderColor="teal.400"
                size="lg"
              >
                <NumberInputField placeholder="Costo" />
              </NumberInput>
            </GridItem>

            {/* Campo Numérico para la Cantidad */}
            <GridItem>
              <Text fontSize="md" mb={1}>Cantidad</Text>
              <NumberInput
                value={quantity}
                onChange={(valueString) => setQuantity(valueString)}
                focusBorderColor="teal.400"
                size="lg"
              >
                <NumberInputField placeholder="Cantidad" />
              </NumberInput>
            </GridItem>
          </Grid>

          {/* Botón para enviar */}
          <Button
            type="submit"
            colorScheme="teal"
            size="lg"
            w="full"
            mt={6}
            py={6}
            onClick={onSubmit}
            disabled={postStockLoading}
          >
            Guardar Stock
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
