import { 
  Box,
  Button,
  IconButton,
  Input,
  List,
  ListItem,
  Text,
  VStack,
  useDisclosure,
  ScaleFade,
  Container,
  Card,
  CardBody,
  CardHeader,
  Heading,
  SimpleGrid,
  Tooltip,
  useToast
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ProductAction } from '../../store/product/actions';
import { useProductStore } from '../../store/product/slice';
import { StockAction } from '../../store/stock/actions';
import { useStockStore } from '../../store/stock/slice';
import { getErrorMessage } from './errors';
import { Select } from 'chakra-react-select';
import { useProductAtributesStore } from '../../store/product-atributes/slice';
import { motion } from 'framer-motion';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

const MotionBox = motion(Box);

export default function StockEntry() {
  const defaultStockEntries = [
    { product: null, quantity: '', cost: '', color: '', size: '', showDropdown: false, searchTerm: '' }
  ]
  const [stockEntries, setStockEntries] = useState(defaultStockEntries);

  const { getProductsByCodeOrName } = ProductAction();
  const { postStockMultiple } = StockAction();
  const productsByCodeOrName = useProductStore(state => state.productsByCodeOrName);
  const postStockStatus: any = useStockStore(state => state.postStockStatus);
  const postStockLoading = useStockStore(state => state.postStockLoading);
  const restoreStatusAndLoading = useStockStore(state => state.restoreStatusAndLoading);
  const allColors = useProductAtributesStore(state => state.allColors);
  const chakraToast = useToast();

  // handlers
  const findProductById = (index, id: string) => {
    const product = productsByCodeOrName.find(product => product.id === id);
    const updatedEntries = [...stockEntries];
    updatedEntries[index].product = product;
    setStockEntries(updatedEntries);
  }

  useEffect(() => {
    if (postStockStatus.success) {
      toast.success('Entrada de stock guardada');
      setStockEntries(defaultStockEntries);
      restoreStatusAndLoading();
    }
    if (postStockStatus.error) {
      postStockStatus.error.response.errors.forEach(err => {
        toast.error(getErrorMessage(err.error, err.index), { duration: 5000, position: 'top-right', });
      });
      restoreStatusAndLoading();
    }
  }, [postStockStatus])

  //chekc if is duplicated row
  const isDuplicatedRow = (index, updatedEntries) => {
    const product = updatedEntries[index]?.product?.id;
    const quantity = updatedEntries[index].quantity;
    const color = updatedEntries[index].color;
    const size = updatedEntries[index].size;
    const cost = updatedEntries[index].cost;
    const some = updatedEntries.some((entry, i) => i !== index && entry.product?.id === product && entry.quantity === quantity && entry.color === color && entry.size === size && entry.cost === cost);
    if (some) {
      toast.error('La entrada ya existe');
      return true;
    }
    return false;
  }

  // check if last entry is completed
  const isRowComplete = (index) => {

    const product = stockEntries[index]?.product?.id;
    const quantity = stockEntries[index]?.quantity;
    const color = stockEntries[index]?.color;
    const size = stockEntries[index]?.size;
    const cost = stockEntries[index]?.cost
    return Boolean(product && quantity && color && size && cost);
  }

  const handleInputChange = (index, field, value) => {
    if (field === 'searchTerm') {
      getProductsByCodeOrName(value);
    }
    const updatedEntries = [...stockEntries];
    updatedEntries[index][field] = value.value || value;
    if (isDuplicatedRow(index, updatedEntries)) {
      handleRemoveEntry(index);
      return;
    }
    setStockEntries(updatedEntries);
  };


  const handleAddEntry = () => {
    if (!isRowComplete(stockEntries.length - 1)) {
      return;
    }
    setStockEntries([...stockEntries, { product: null, quantity: '', cost: '', color: '', size: '', showDropdown: false, searchTerm: '' }]);
  };

  const handleRemoveEntry = (index) => {
    if (stockEntries.length > 1) {
      const updatedEntries = stockEntries.filter((_, i) => i !== index);
      setStockEntries(updatedEntries);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let stockEntriesClone = [...stockEntries];
    if (!isRowComplete(stockEntries.length - 1)) {
      stockEntriesClone = stockEntriesClone.slice(0, -1);
      handleRemoveEntry(stockEntries.length - 1);
    }
    const stockEntriesToPost = stockEntriesClone.map((entry: any) => {
      return ({
      product: entry.product.id,
      variant: {
        color: entry.color.map(e => e.value),
        size: entry.size.map(e => e.value)
      },
      costPrice: Number(entry.cost),
      quantity: Number(entry.quantity),
    })})
    postStockMultiple(stockEntriesToPost);
  };

  return (
    <Container maxW="7xl" py={8}>
      <Card>
        <CardHeader>
          <Heading size="lg" color="teal.600">Entrada de Stock</Heading>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <VStack spacing={6}>
              {stockEntries.map((entry, index) => (
                <ScaleFade in={true} key={index}>
                  <Card variant="outline" w="full" borderColor="teal.100">
                    <CardBody>
                      <SimpleGrid columns={{ base: 1, md: 2, lg: 6 }} spacing={4} alignItems="start">
                        <Box>
                          <Text fontSize="sm" mb={2} color="gray.600">Producto #{index + 1}</Text>
                          <Box position="relative">
                            <Input
                              size="md"
                              placeholder="Buscar producto..."
                              value={entry.searchTerm}
                              onChange={(e) => handleInputChange(index, 'searchTerm', e.target.value)}
                              focusBorderColor="teal.400"
                              onFocus={() => handleInputChange(index, 'showDropdown', true)}
                              bg="white"
                              _hover={{ borderColor: 'teal.300' }}
                            />
                            {entry.showDropdown && productsByCodeOrName.length > 0 && (
                              <List
                                position="absolute"
                                zIndex={1000}
                                w="full"
                                maxH="200px"
                                overflowY="auto"
                                mt={1}
                                bg="white"
                                boxShadow="lg"
                                borderRadius="md"
                                border="1px solid"
                                borderColor="gray.200"
                              >
                                {productsByCodeOrName.map((product, indexP) => (
                                  <ListItem
                                    key={indexP}
                                    px={4}
                                    py={2}
                                    cursor="pointer"
                                    transition="all 0.2s"
                                    _hover={{ bg: 'teal.50' }}
                                    onClick={() => {
                                      findProductById(index, product.id);
                                      handleInputChange(index, 'searchTerm', `${product.name} (${product.code})`);
                                      handleInputChange(index, 'showDropdown', false);
                                      handleInputChange(index, 'cost', product.prices.cost);
                                    }}
                                  >
                                    {product.name} ({product.code})
                                  </ListItem>
                                ))}
                              </List>
                            )}
                          </Box>
                        </Box>

                        <Box>
                          <Text fontSize="sm" mb={2} color="gray.600">Color</Text>
                          <Select
                            isMulti
                            placeholder="Seleccionar color"
                            value={entry.color}
                            onChange={(value) => handleInputChange(index, 'color', value)}
                            options={entry.product?.colors.map(color => ({ value: color, label: allColors.find(c => c.value === color)?.label }))}
                            size="md"
                            chakraStyles={{
                              container: (provided) => ({
                                ...provided,
                                bg: 'white',
                              })
                            }}
                          />
                        </Box>

                        <Box>
                          <Text fontSize="sm" mb={2} color="gray.600">Talle</Text>
                          <Select
                            isMulti
                            placeholder="Seleccionar talle"
                            value={entry.size}
                            onChange={(value) => handleInputChange(index, 'size', value)}
                            options={entry.product?.sizes.map(size => ({ value: size, label: size }))}
                            size="md"
                            chakraStyles={{
                              container: (provided) => ({
                                ...provided,
                                bg: 'white',
                              })
                            }}
                          />
                        </Box>

                        <Box>
                          <Text fontSize="sm" mb={2} color="gray.600">Cantidad</Text>
                          <Input
                            type="number"
                            placeholder="0"
                            value={entry.quantity}
                            onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                            size="md"
                            bg="white"
                            _hover={{ borderColor: 'teal.300' }}
                          />
                        </Box>

                        <Box>
                          <Text fontSize="sm" mb={2} color="gray.600">Costo</Text>
                          <Input
                            type="number"
                            placeholder="$0.00"
                            value={entry.cost}
                            onChange={(e) => handleInputChange(index, 'cost', e.target.value)}
                            size="md"
                            bg="white"
                            _hover={{ borderColor: 'teal.300' }}
                          />
                        </Box>

                        <Box>
                          <Text fontSize="sm" mb={2} color="gray.600">&nbsp;</Text>
                          <Tooltip label="Eliminar entrada" placement="top">
                            <IconButton
                              aria-label="Eliminar entrada"
                              icon={<DeleteIcon />}
                              colorScheme="red"
                              variant="ghost"
                              onClick={() => handleRemoveEntry(index)}
                              isDisabled={stockEntries.length === 1}
                            />
                          </Tooltip>
                        </Box>
                      </SimpleGrid>
                    </CardBody>
                  </Card>
                </ScaleFade>
              ))}

              <Button
                leftIcon={<AddIcon />}
                colorScheme="teal"
                onClick={handleAddEntry}
                size="md"
                w={{ base: "full", md: "auto" }}
                isDisabled={!isRowComplete(stockEntries.length - 1)}
                variant="outline"
              >
                Añadir producto
              </Button>

              <Button
                colorScheme="blue"
                size="lg"
                w="full"
                type="submit"
                isLoading={postStockStatus.isFetching}
                isDisabled={postStockLoading || !isRowComplete(stockEntries.length - 1)}
                boxShadow="md"
                _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                transition="all 0.2s"
              >
                Guardar todos los stocks
              </Button>
            </VStack>
          </form>
        </CardBody>
      </Card>
    </Container>
  );
}
