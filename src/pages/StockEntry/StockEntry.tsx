import { Box, Button, HStack, Input, List, ListItem, Select, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { mapColors } from '../../constants/maps';
import { ProductAction } from '../../store/product/actions';
import { useProductStore } from '../../store/product/slice';
import { StockAction } from '../../store/stock/actions';
import { useStockStore } from '../../store/stock/slice';
import { getErrorMessage } from './errors';

export default function StockEntry() {
  // states
  // const [searchTerm, setSearchTerm] = useState('');
  // const [showDropdown, setShowDropdown] = useState(false);
  // const [selectedProduct, setSelectedProduct] = useState(null);
  const defaultStockEntries = [
    { product: null, quantity: '', cost: '', color: '', size: '', showDropdown: false, searchTerm: '' }
  ]
  const [stockEntries, setStockEntries] = useState(defaultStockEntries);

  // actions stores
  const { getProductsByCodeOrName } = ProductAction();
  const { postStockMultiple } = StockAction();
  const productsByCodeOrName = useProductStore(state => state.productsByCodeOrName);
  const postStockStatus: any = useStockStore(state => state.postStockStatus);
  const postStockLoading = useStockStore(state => state.postStockLoading);
  console.log(postStockLoading)
  const restoreStatusAndLoading = useStockStore(state => state.restoreStatusAndLoading);

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
    const quantity = stockEntries[index].quantity;
    const color = stockEntries[index].color;
    const size = stockEntries[index].size;
    const cost = stockEntries[index].cost
    return Boolean(product && quantity && color && size && cost);
  }

  const handleInputChange = (index, field, value) => {
    if (field === 'searchTerm') {
      getProductsByCodeOrName(value);
    }
    const updatedEntries = [...stockEntries];
    updatedEntries[index][field] = value;
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
    const updatedEntries = stockEntries.filter((_, i) => i !== index);
    setStockEntries(updatedEntries);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let stockEntriesClone = [...stockEntries];
    if (!isRowComplete(stockEntries.length - 1)) {
      stockEntriesClone = stockEntriesClone.slice(0, -1);
      handleRemoveEntry(stockEntries.length - 1);
    }
    console.log('Enviando registros de stock:', stockEntriesClone);
    const stockEntriesToPost = stockEntriesClone.map(entry => ({
      product: entry.product.id,
      variant: {
        color: entry.color,
        size: entry.size
      },
      costPrice: Number(entry.cost),
      quantity: Number(entry.quantity),
    }))
    postStockMultiple(stockEntriesToPost);
  };

  return (
    <Box maxW="full" mt={10} p={8} boxShadow="lg" borderRadius="lg" bg="gray.50">
      <Text fontSize="2xl" fontWeight="bold" mb={6}>Cargar Stocks</Text>
      <form onSubmit={handleSubmit}>
        <VStack spacing={6}>
          {stockEntries.map((entry, index) => (
            <HStack key={index} spacing={4} w="full">
              <Text fontSize="md" mb={1}>{index + 1}</Text>

              <Box position="relative" w="100%">
                <Input
                  size="lg"
                  placeholder="Escribe para buscar..."
                  value={entry.searchTerm}
                  onChange={(e) => handleInputChange(index, 'searchTerm', e.target.value)}
                  focusBorderColor="teal.400"
                  onFocus={() => handleInputChange(index, 'showDropdown', true)}
                />

                {entry.showDropdown && productsByCodeOrName.length > 0 && (
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
                      .map((product, indexP) => (
                        <ListItem
                          key={indexP}
                          px={4}
                          py={2}
                          cursor="pointer"
                          _hover={{ bg: 'teal.100' }}
                          onClick={() => {
                            findProductById(index, product.id);
                            handleInputChange(index, 'searchTerm', `${product.name} (${product.code})`);
                            handleInputChange(index, 'showDropdown', false);
                          }}
                        >
                          {product.name} ({product.code})
                        </ListItem>
                      ))}
                  </List>
                )}
              </Box>
              <Select
                placeholder="Color"
                value={entry.color}
                onChange={(e) => handleInputChange(index, 'color', e.target.value)}
                size="lg"
              >
                {entry.product?.colors.map(color => (
                  <option key={color} value={color}>
                    {mapColors[color]}
                  </option>
                ))}
              </Select>
              <Select
                placeholder="Talle"
                value={entry.size}
                onChange={(e) => handleInputChange(index, 'size', e.target.value)}
                size="lg"
              >
                {entry.product?.sizes.map(size => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </Select>
              <Input
                type="number"
                placeholder="Cantidad"
                value={entry.quantity}
                onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                size="lg"
              />
              <Input
                type="number"
                placeholder="Costo"
                value={entry.cost}
                onChange={(e) => handleInputChange(index, 'cost', e.target.value)}
                size="lg"
              />
              <Button colorScheme="red" size="lg" onClick={() => handleRemoveEntry(index)}>
                X
              </Button>
            </HStack>
          ))}
          <Button colorScheme="teal" onClick={handleAddEntry} size="lg" w="full" mt={4}>
            Añadir otro producto
          </Button>
          <Button isDisabled={postStockLoading} type="submit" colorScheme="blue" size="lg" w="full" mt={6}>
            Guardar todos los stocks
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
