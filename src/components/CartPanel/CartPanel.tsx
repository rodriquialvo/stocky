import { DeleteIcon, AddIcon, MinusIcon } from '@chakra-ui/icons';
import { 
  Badge,
  Box, 
  Button, 
  Divider, 
  Drawer, 
  DrawerBody, 
  DrawerCloseButton, 
  DrawerContent, 
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay, 
  Flex, 
  Heading, 
  IconButton, 
  Image, 
  Text,
  Tooltip,
  useColorModeValue,
  VStack,
  HStack,
  Spinner,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { FC, useEffect, useState, useRef } from 'react';
import { useSessionStore } from '../../store/session/slice';
import { CartAction } from '../../store/shoppingcart/actions';
import { useCartStore } from '../../store/shoppingcart/slice';
import { capitalizeFirstLetter, formattedNumberToMoney } from '../../utils/functions';
import QuantityPicker from '../QuantityPicker/QuantityPicker';
import { CartPanelProps } from './interfaces';
import { SaleAction } from '../../store/sales/actions';
import { useSaleStore } from '../../store/sales/slice';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const CartPanel: FC<CartPanelProps> = props => {
  const cart = useCartStore(state => state.cart);
  const statusCart = useCartStore(state => state.status);
  const userLogged = useSessionStore(state => state.userLogged);
  const [exceededItems, setExceededItems] = useState<{ label: string, value: string }[]>([]);
  const [showItemError, setShowItemError] = useState(false);
  const { postSale } = SaleAction();
  const [variantsQuantity, setVariantsQuantity] = useState({});
  const status = useSaleStore(state => state.status);
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [itemToRemove, setItemToRemove] = useState<any>(null);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const errorBgColor = useColorModeValue('red.50', 'red.900');
  const headingColor = useColorModeValue('pink.500', 'pink.300');

  const { updateQuantity, removeFromCart, getCart } = CartAction();

  const handleQuantityChange = (id: string, value: number, productId: string) => {
    if (value < 0) {
      return;
    }
    setVariantsQuantity({ ...variantsQuantity, [id + productId]: value });
    if (value >= 1) {
      onUpdateQuantityPressed(id, value, productId);
    }
  };

  const onUpdateQuantityPressed = async (id: string, value: number, productId: string) => {
    await updateQuantity({
      params: {
        cartId: cart._id,
        variantId: id,
      },
      body: {
        quantity: value,
        productId: productId
      }
    });
  };

  const confirmRemoveItem = (variantId: string) => {
    setItemToRemove(variantId);
    onAlertOpen();
  };

  const handleRemoveConfirmed = async () => {
    if (itemToRemove) {
      await removeFromCart(cart._id, itemToRemove);
      setItemToRemove(null);
    }
    onAlertClose();
  };

  const onConfirmOrderPressed = () => {
    if (exceededItems.length > 0) {
      toast.error("No se puede realizar la compra debido a que hay productos con stock insuficiente");
      setShowItemError(true);
      return;
    }
    postSale({ cartId: cart._id });
  };

  useEffect(() => {
    if (userLogged?.id) {
      getCart(userLogged.id);
    }
  }, []);

  useEffect(() => {
    setExceededItems(cart?.items?.filter(item => item?.quantity > item.stock?.quantity)?.map(item => ({ label: item.product.name, value: item.product._id })) || []);
  }, [cart?.items]);

  useEffect(() => {
    setVariantsQuantity(cart?.items?.reduce((acc, item) => ({ ...acc, [item.variant._id + item.product._id]: item?.quantity }), {}));
  }, [cart]);

  const MotionBox = motion(Box);

  return (
    <>
      <Drawer
        size="md"
        isOpen={props.isOpen}
        placement="right"
        onClose={props.onClose}
      >
        <DrawerOverlay bg="blackAlpha.300" backdropFilter="blur(5px)" />
        <DrawerContent>
          <DrawerCloseButton size="lg" color={headingColor} />
          <DrawerHeader borderBottomWidth="1px">
            <Heading size="lg" color={headingColor}>
              Mi carrito
            </Heading>
          </DrawerHeader>

          <DrawerBody px={4} py={6}>
            {statusCart.isFetching ? (
              <Flex justifyContent="center" alignItems="center" height="300px">
                <Spinner size="xl" color="pink.400" thickness="4px" />
              </Flex>
            ) : !cart?.items?.length ? (
              <VStack spacing={6} justify="center" align="center" height="300px">
                <Image 
                  src="https://cdn-icons-png.flaticon.com/512/2037/2037457.png" 
                  alt="Carrito vacío"
                  boxSize="150px"
                  opacity={0.6}
                />
                <Heading size="md" color="gray.500">Tu carrito está vacío</Heading>
                <Text color="gray.500">¡Añade algunos productos para comenzar!</Text>
                <Button 
                  leftIcon={<AddIcon />}
                  colorScheme="pink" 
                  variant="outline"
                  onClick={props.onClose}
                >
                  Seguir comprando
                </Button>
              </VStack>
            ) : (
              <AnimatePresence>
                <VStack spacing={4} align="stretch" divider={<Divider />}>
                  {cart.items.map((item, index) => {
                    const isExceeded = !!exceededItems.find(exceededItem => exceededItem.value === item.product._id);
                    
                    return (
                      <MotionBox
                        key={item.variant._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        borderWidth="1px"
                        borderRadius="lg"
                        p={4}
                        bg={(showItemError && isExceeded) ? errorBgColor : bgColor}
                        borderColor={borderColor}
                        position="relative"
                        _hover={{ shadow: "md" }}
                      >
                        {(showItemError && isExceeded) && (
                          <Badge 
                            position="absolute" 
                            top={2} 
                            right={2}
                            colorScheme="red"
                          >
                            Stock insuficiente
                          </Badge>
                        )}
                        
                        <Flex gap={4}>
                          <Image
                            src={item?.product?.pictures[0]?.url || 'https://picsum.photos/200'}
                            alt={item.product.name}
                            boxSize="100px"
                            objectFit="cover"
                            borderRadius="md"
                            shadow="sm"
                          />
                          
                          <VStack align="stretch" flex={1} spacing={2}>
                            <Flex justifyContent="space-between" alignItems="center">
                              <Heading color={headingColor} size="md">
                                {item.product.name}
                              </Heading>
                              <Tooltip label="Eliminar producto">
                                <IconButton
                                  aria-label='Eliminar producto'
                                  icon={<DeleteIcon />}
                                  onClick={() => confirmRemoveItem(item.variant._id)}
                                  variant='ghost'
                                  colorScheme="red"
                                  size="sm"
                                />
                              </Tooltip>
                            </Flex>
                            
                            <HStack>
                              <Badge colorScheme="purple">Talle: {item.variant.size}</Badge>
                              <Badge colorScheme="blue">Color: {capitalizeFirstLetter(item.variant.color)}</Badge>
                            </HStack>
                            
                            <Flex justifyContent="space-between" alignItems="center">
                              <Text fontSize="sm" color="green.600">
                                P/u Revendedor: {formattedNumberToMoney(item.product.prices.reseller)}
                              </Text>
                              <Text fontWeight="bold" color="green.500">
                                {formattedNumberToMoney(item.product.prices.reseller * variantsQuantity[item.variant._id + item.product._id])}
                              </Text>
                            </Flex>
                            
                            <Flex justifyContent="space-between" alignItems="center">
                              <Text fontSize="sm" color="orange.600">
                                P/u Cliente final: {formattedNumberToMoney(item.product.prices.retail)}
                              </Text>
                              <Text fontWeight="bold" color="orange.500">
                                {formattedNumberToMoney(item.product.prices.retail * variantsQuantity[item.variant._id + item.product._id])}
                              </Text>
                            </Flex>
                            
                            <Box pt={2}>
                              <QuantityPicker
                                stock={item?.stock?.quantity}
                                quantity={variantsQuantity[item.variant._id + item.product._id]}
                                onIncrease={() => handleQuantityChange(item.variant._id, variantsQuantity[item.variant._id + item.product._id] + 1, item.product._id)}
                                onDecrease={() => handleQuantityChange(item.variant._id, variantsQuantity[item.variant._id + item.product._id] - 1, item.product._id)}
                                isDisabled={statusCart.isFetching}
                              />
                            </Box>
                          </VStack>
                        </Flex>
                      </MotionBox>
                    );
                  })}
                </VStack>
              </AnimatePresence>
            )}
          </DrawerBody>

          {cart?.items?.length > 0 && (
            <DrawerFooter borderTopWidth="1px" flexDirection="column" gap={4}>
              <Flex 
                width="100%" 
                bg="gray.50" 
                p={4} 
                borderRadius="md" 
                direction="column"
                gap={2}
              >
                <Flex justifyContent="space-between">
                  <Text fontWeight="semibold">Subtotal:</Text>
                  <Text fontWeight="semibold">{formattedNumberToMoney(cart.total_reseller)}</Text>
                </Flex>
                
                <Flex justifyContent="space-between">
                  <HStack>
                    <Text fontWeight="bold" color="green.600">Revendedor:</Text>
                    <Tooltip label="Precio para revendedores">
                      <Box as="span">ℹ️</Box>
                    </Tooltip>
                  </HStack>
                  <Text fontWeight="bold" color="green.600">{formattedNumberToMoney(cart.total_reseller)}</Text>
                </Flex>
                
                <Flex justifyContent="space-between">
                  <HStack>
                    <Text fontWeight="bold" color="orange.600">Cliente final:</Text>
                    <Tooltip label="Precio sugerido para venta al público">
                      <Box as="span">ℹ️</Box>
                    </Tooltip>
                  </HStack>
                  <Text fontWeight="bold" color="orange.600">{formattedNumberToMoney(cart.total_retail)}</Text>
                </Flex>
                
                <Divider my={2} />
                
                {exceededItems.length > 0 && (
                  <Box bg="red.50" p={2} borderRadius="md" mb={2}>
                    <Text color="red.500" fontSize="sm">
                      Hay productos con stock insuficiente. Por favor, ajusta las cantidades.
                    </Text>
                  </Box>
                )}
              </Flex>

              <Button
                height="56px"
                isLoading={status.isFetching}
                w="100%"
                colorScheme="pink"
                onClick={onConfirmOrderPressed}
                isDisabled={!cart?.items?.length || exceededItems.length > 0}
                _hover={{ transform: 'scale(1.02)' }}
                transition="all 0.2s"
              >
                Terminar compra
              </Button>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>

      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onAlertClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Eliminar Producto
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Estás seguro? No podrás deshacer esta acción.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onAlertClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={handleRemoveConfirmed} ml={3}>
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default CartPanel;
