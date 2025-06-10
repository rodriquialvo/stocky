import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, Flex, Heading, IconButton, Image, Text, HStack } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Item } from '../../services/shoppingcart/dtos/generic';
import { ProductAction } from '../../store/product/actions';
import { SaleAction } from '../../store/sales/actions';
import { useSaleStore } from '../../store/sales/slice';
import { useSessionStore } from '../../store/session/slice';
import { CartAction } from '../../store/shoppingcart/actions';
import { useCartStore } from '../../store/shoppingcart/slice';
import { capitalizeFirstLetter, formattedNumberToMoney } from '../../utils/functions';
import QuantityPicker from '../QuantityPicker/QuantityPicker';
import WholesaleModal from '../WholesaleModal/WholesaleModal';
import { CartPanelProps } from './interfaces';

const ProductHeader = ({ children, item, onEditPressed, onRemoveFromCartPressed }: any) => {
  const isComplexWholesale = item.product.wholesale_data?.is_wholesaler && item.product.wholesale_data?.package_type !== "simple";

  return (
    <Flex
      alignItems={"center"}
      justify={isComplexWholesale ? "space-between" : "flex-start"}
      width="100%"
    >
      {children}
      <HStack spacing={2} ml={isComplexWholesale ? 0 : "auto"}>
        {!item.variant && (
          <EditButton item={item} onEditPressed={onEditPressed} />
        )}
        <DeleteButton item={item} onRemoveFromCartPressed={onRemoveFromCartPressed} />
      </HStack>
    </Flex>
  )
}

const HeadingProduct = ({ item }: any) => {
  return (
    <Heading color={"pink.400"} textAlign={"left"} fontSize="md">{item.product.name}</Heading>
  )
}

const DeleteButton = ({ item, onRemoveFromCartPressed }: any) => {
  return (
    <IconButton
      aria-label='Delete'
      color={"red.600"}
      icon={<DeleteIcon />}
      onClick={() => onRemoveFromCartPressed(item.variant?._id || null, item.product._id, item.is_wholesale_package)}
      variant='ghost'
    />
  )
}

const ProductPriceContainer = ({ children }: any) => {
  return (
    <Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"100%"}
      >
        {children}
      </Box>
    </Box>
  )
}

const ProductDetail = ({ color, price, text }: any) => {
  return (
    <Box>
      <Text fontSize={"sm"} color={`${color}.600`} textAlign={"left"} size={"sm"}>{text}: {formattedNumberToMoney(price)}</Text>
    </Box>
  )
}

const ProductPrices = ({ item }: any) => {
  return (
    <Box>
      <ProductPriceContainer>
        <ProductDetail color={"green"} price={item.product.prices.reseller} text={"P/u Revendedor"} />
      </ProductPriceContainer>
      <ProductPriceContainer>
        <ProductDetail color={"orange"} price={item.product.prices.retail} text={"P/u Cliente"} />
      </ProductPriceContainer>
      <ProductPriceContainer>
        <ProductDetail color={"purple"} price={item.quantity === 6 ? item?.product?.prices?.wholesale?.half_dozen : item?.product?.prices?.wholesale?.dozen} text={"P/u Mayorista"} />
      </ProductPriceContainer>
    </Box>
  )
}

const HeadingTotalContainer = ({ children }: any) => {
  return (
    <Box>
      {children}
    </Box>
  )
}

const HeadingTotal = ({ color, children }: any) => {
  return (
    <Heading color={`${color}.400`} textAlign={"left"} fontSize="md">{children}</Heading>
  )
}

const ButtonFinishPurchase = ({ status, onConfirmOrderPressed }: any) => {
  return (
    <Button
      isLoading={status.isFetching}
      w={"full"}
      colorScheme={'pink'}
      onClick={onConfirmOrderPressed}
    >Terminar compra</Button>
  )
}

const QuantityPickerVariant = ({ item, variantsQuantity, handleQuantityChange, statusCart }: any) => {
  return (
    <Box>
      <QuantityPicker
        stock={item?.stock?.quantity}
        quantity={variantsQuantity[item.variant._id + item.product._id + (item.product.wholesale_data?.package_type === 'complex' && item.is_wholesale_package ? 'complex' : '')]}
        onIncrease={() => handleQuantityChange(item.variant._id, variantsQuantity[item.variant._id + item.product._id + (item.product.wholesale_data?.package_type === 'complex' && item.is_wholesale_package ? 'complex' : '')], item.product._id, 'increase', item.product.wholesale_data?.package_type === 'complex' && item.is_wholesale_package)}
        onDecrease={() => handleQuantityChange(item.variant._id, variantsQuantity[item.variant._id + item.product._id + (item.product.wholesale_data?.package_type === 'complex' && item.is_wholesale_package ? 'complex' : '')], item.product._id, 'decrease', item.product.wholesale_data?.package_type === 'complex' && item.is_wholesale_package)}
        isDisabled={statusCart.isFetching}
        isSimpleWholesale={item.product.wholesale_data?.is_wholesaler && item.product.wholesale_data?.package_type === "simple"}
        isWholesale={item.product.wholesale_data?.is_wholesaler}
      />
    </Box>
  )
}

const EditButton = ({ item, onEditPressed }: any) => {
  return (
    <IconButton
      aria-label='Edit'
      color={"blue.600"}
      icon={<EditIcon />}
      onClick={() => onEditPressed(item)}
      variant='ghost'
    />
  )
}

const VariantAccordion = ({ item, handleQuantityChange, statusCart, variantsQuantity, onRemoveFromCartPressed }: any) => {
  return (
    <Accordion allowMultiple>
      <AccordionItem>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Text fontSize={"sm"} color={"gray.600"}>Variantes al por mayor</Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          {item.wholesale_variants.map((variant: any) => (
            <Box key={variant.variant._id} mb={2} p={2} borderWidth="1px" borderRadius="md">
              <Flex justifyContent="space-between" alignItems="center">
                <Box>
                  <Text fontSize={"sm"} color={"gray.600"} textAlign={"left"} size={"sm"}>Talle: {variant.variant.size_label}</Text>
                  <Text fontSize={"sm"} color={"gray.600"} textAlign={"left"} size={"sm"}>Color: {capitalizeFirstLetter(variant.variant.color)}</Text>
                </Box>
                <DeleteButton item={{ variant: variant.variant, product: item.product, is_wholesale_package: true }} onRemoveFromCartPressed={onRemoveFromCartPressed} />
              </Flex>

              <QuantityPicker
                stock={variant.stock?.quantity}
                quantity={variant.quantity}
                onIncrease={() => handleQuantityChange(variant.variant._id, variantsQuantity[variant.variant._id + item.product._id], item.product._id, 'increase', true, variant.predefined_quantity)}
                onDecrease={() => handleQuantityChange(variant.variant._id, variantsQuantity[variant.variant._id + item.product._id], item.product._id, 'decrease', true, variant.predefined_quantity)}
                isDisabled={statusCart.isFetching}
                isSimpleWholesale={item.product.wholesale_data?.is_wholesaler && item.product.wholesale_data?.package_type === "simple"}
                isWholesale={item.product.wholesale_data?.is_wholesaler}
                disableButtons={item.product.wholesale_data?.is_wholesaler && item.product.wholesale_data?.package_type !== "simple"}
              />
            </Box>
          ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

const CartPanel: FC<CartPanelProps> = props => {
  const cart = useCartStore(state => state.cart);
  const statusCart = useCartStore(state => state.status)
  const userLogged = useSessionStore(state => state.userLogged);
  const isAuthenticated = useSessionStore(state => state.isAuthenticated);
  const [exceededItems, setExceededItems] = useState<{ label: string, value: string }[]>([]);
  const [showItemError, setShowItemError] = useState(false);
  const { postSale } = SaleAction()
  const [variantsQuantity, setVariantsQuantity] = useState({});
  const status = useSaleStore(state => state.status)
  const [isWholesaleModalOpen, setIsWholesaleModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const { getProductDetail } = ProductAction()
  const { updateQuantity, removeFromCart, getCart } = CartAction();

  useEffect(() => {
    if (userLogged?.id) {
      getCart(userLogged.id);
    }
  }, []);

  useEffect(() => {
    setExceededItems(cart?.items?.filter(item => item?.quantity > item.stock?.quantity)?.map(item => ({ label: item.product.name, value: item.product._id })) || [])
  }, [cart?.items])

  useEffect(() => {
    setVariantsQuantity(cart?.items?.reduce((acc, item) => {
      if (item.variant) {
        acc[item.variant._id + item.product._id] = item.quantity;
      } else {
        item.wholesale_variants.forEach((variant: any) => {
          acc[variant.variant._id + item.product._id + 'complex'] = variant.quantity;
        });
      }
      return acc;
    }, {}))

  }, [cart]);

  if (!isAuthenticated) {
    return null;
  }

  const handleQuantityChange = (id: string, value: number, productId: string, operation: 'increase' | 'decrease', isWholesalePackage?: boolean, predefinedQuantity?: number) => {
    if (value < 0) {
      return;
    }

    // Encontrar el producto en el carrito
    const product = cart.items.find(item => item.product._id === productId);
    const isSimpleWholesale = product?.product.wholesale_data?.is_wholesaler && product?.product.wholesale_data?.package_type === "simple";

    // Si es un producto simple mayorista, validar que el valor sea válido
    if (isSimpleWholesale) {
      const validValues = [0, 6, 12, 24, 36, 48];
      const currentIndex = validValues.indexOf(value);
      if (currentIndex === -1) {
        // Si el valor no es válido, encontrar el valor válido más cercano
        const nearestValue = validValues.reduce((prev, curr) => {
          return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
        });
        value = nearestValue;
      }
      setVariantsQuantity({ ...variantsQuantity, [id + productId]: operation === 'increase' ? validValues[currentIndex + 1] : validValues[currentIndex - 1] });
      if (value >= 0) {
        onUpdateQuantityPressed(id, operation === 'increase' ? validValues[currentIndex + 1] : validValues[currentIndex - 1], productId, isWholesalePackage, predefinedQuantity);
      }
    } else {
      setVariantsQuantity({ ...variantsQuantity, [id + productId]: operation === 'increase' ? value + 1 : value - 1 });
      if (value >= 0) {
        onUpdateQuantityPressed(id, operation === 'increase' ? value + 1 : value - 1, productId, isWholesalePackage, predefinedQuantity);
      }
    }
  };

  const onUpdateQuantityPressed = async (id: string, value: number, productId: string, isWholesalePackage?: boolean, predefinedQuantity?: number) => {
    await updateQuantity({
      params: {
        cartId: cart._id,
        variantId: id,
      },
      body: {
        quantity: value,
        productId: productId,
        isWholesalePackage: isWholesalePackage,
        predefinedQuantity: predefinedQuantity
      }
    })
  };

  const onEditPressed = async (item: Item) => {
    setSelectedItem(item);
    await getProductDetail(item.product._id);
    setIsWholesaleModalOpen(true);
  }

  const onRemoveFromCartPressed = async (variantId: string, productId?: string, isWholesalePackage?: boolean) => {
    await removeFromCart(cart._id, variantId, productId, isWholesalePackage)
  };

  const onConfirmOrderPressed = () => {
    if (exceededItems.length > 0) {
      toast.error("No se puede realizar la compra debido a que hay productos con stock insuficiente")
      setShowItemError(true);
      return
    }

    // Verificar si hay productos complejos mayoristas sin variantes o con cantidad incorrecta
    const incompleteProducts = cart.items.filter(item => {
      const isComplexWholesale = item.product.wholesale_data?.is_wholesaler && item.product.wholesale_data?.package_type === "complex" && item.is_wholesale_package;

      if (!isComplexWholesale) return false;

      // Verificar que existan variantes
      const hasVariants = item.wholesale_variants && item.wholesale_variants.length > 0;
      if (!hasVariants) return true;

      // Verificar que la cantidad de variantes sea igual a la cantidad predefinida
      // Para productos complejos mayoristas, la cantidad predefinida es la cantidad total del producto;
      const variantsQuantity = item.wholesale_variants.reduce((total, variant) => total + variant.quantity, 0);

      return variantsQuantity !== item.predefined_quantity;
    });

    if (incompleteProducts.length > 0) {
      const product = incompleteProducts[0];
      const variantsQuantity = product.wholesale_variants ?
        product.wholesale_variants.reduce((total, variant) => total + variant.quantity, 0) : 0;

      toast.error(`${product.product.name} requiere ${product.predefined_quantity} variantes y se proporcionaron ${variantsQuantity}`);
      return;
    }

    postSale({ cartId: cart._id })
  }

  return (
    <>
      <>
        <Drawer
          size="md"
          isOpen={props.isOpen} placement="right" onClose={props.onClose}>
          px={2}
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              <Heading
              >
                Mi carrito
              </Heading>
              <Divider my={5} />
              {
                !!cart?.items?.length &&
                cart.items.map(item => {
                  return (
                    <>
                      <Box
                        my={2}
                        flexDirection={"row"}
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        px={1}
                        bg={(showItemError && !!exceededItems.find(exceededItem => exceededItem.value === item.product._id)) ? "red.100" : ""}
                      >
                        <Box
                          display={"flex"}
                          gap={4}
                          justifyContent={"center"}
                          alignItems={"center"}
                          w={"100%"}
                        >
                          <Image
                            src={item?.product?.pictures[0]?.url || 'https://picsum.photos/200'}
                            alt={item.product.name}
                            boxSize="80px"
                            objectFit="cover"
                            borderRadius={"lg"}
                          />
                          <Box
                            justifyContent={"space-between"}
                            display={"flex"}
                            flexDirection={"column"}
                            width={"100%"}
                          >
                            <ProductHeader
                              item={item}
                              onEditPressed={onEditPressed}
                              onRemoveFromCartPressed={onRemoveFromCartPressed}
                            >
                              <HeadingProduct item={item} />
                            </ProductHeader>

                            <Box>
                              {item.variant ? (
                                <>
                                  <Text fontSize={"sm"} color={"gray.600"} textAlign={"left"} size={"sm"}>Talle: {item.variant.size_label}</Text>
                                  <Text fontSize={"sm"} color={"gray.600"} textAlign={"left"} size={"sm"}>Color: {capitalizeFirstLetter(item.variant.color)}</Text>
                                  <QuantityPickerVariant item={item} variantsQuantity={variantsQuantity} handleQuantityChange={handleQuantityChange} statusCart={statusCart} />
                                </>
                              ) : (
                                <VariantAccordion
                                  item={item}
                                  handleQuantityChange={handleQuantityChange}
                                  statusCart={statusCart}
                                  variantsQuantity={variantsQuantity}
                                  onRemoveFromCartPressed={onRemoveFromCartPressed}
                                />
                              )}
                            </Box>
                            <ProductPrices item={item} />
                          </Box>
                        </Box>
                      </Box>
                      <Divider my={5} />
                    </>
                  )
                })
              }
              <Box
                position="sticky"
              >
                <HeadingTotalContainer>
                  <HeadingTotal>Total:</HeadingTotal>
                  <HeadingTotal color={"green"} size={"sm"}>Revendedor: {!!cart.items.length ? formattedNumberToMoney(cart.total_reseller) : "0"}</HeadingTotal>
                  <HeadingTotal color={"orange"} size={"sm"}>Cliente final: {!!cart.items.length ? formattedNumberToMoney(cart.total_retail) : "0"}</HeadingTotal>
                  <HeadingTotal color={"purple"} size={"sm"}>Mayorista: {!!cart.items.length ? formattedNumberToMoney(cart.total_wholesale) : "0"}</HeadingTotal>
                </HeadingTotalContainer>
                <Divider my={5} />
                <ButtonFinishPurchase status={status} onConfirmOrderPressed={onConfirmOrderPressed} />
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
      <WholesaleModal
        isOpen={isWholesaleModalOpen}
        onClose={() => {
          setIsWholesaleModalOpen(false);
          setSelectedItem(null);
          if (userLogged?.id) {
            getCart(userLogged.id);
          }
        }}
        itemCart={selectedItem}
      />
    </>
  );
};

export default CartPanel;