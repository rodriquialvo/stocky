import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, Flex, Heading, IconButton, Image, Text, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useSessionStore } from '../../store/session/slice';
import { CartAction } from '../../store/shoppingcart/actions';
import { useCartStore } from '../../store/shoppingcart/slice';
import { capitalizeFirstLetter, formattedNumberToMoney } from '../../utils/functions';
import QuantityPicker from '../QuantityPicker/QuantityPicker';
import { CartPanelProps } from './interfaces';
import { SaleAction } from '../../store/sales/actions';
import { useSaleStore } from '../../store/sales/slice';
import toast from 'react-hot-toast';

const ProductHeader = ({ children }: any) => {
  return (
    <Flex
      alignItems={"center"}
      justify={"space-between"}
    >
      {children}
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
        quantity={variantsQuantity[item.variant._id + item.product._id]}
        onIncrease={() => handleQuantityChange(item.variant._id, variantsQuantity[item.variant._id + item.product._id] + 1, item.product._id)}
        onDecrease={() => handleQuantityChange(item.variant._id, variantsQuantity[item.variant._id + item.product._id] - 1, item.product._id)}
        isDisabled={statusCart.isFetching}
      />
    </Box>
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
                  <Text fontSize={"sm"} color={"gray.600"} textAlign={"left"} size={"sm"}>Talle: {variant.variant.size}</Text>
                  <Text fontSize={"sm"} color={"gray.600"} textAlign={"left"} size={"sm"}>Color: {capitalizeFirstLetter(variant.variant.color)}</Text>
                </Box>
                <DeleteButton item={{ variant: variant.variant, product: item.product, is_wholesale_package: true }} onRemoveFromCartPressed={onRemoveFromCartPressed} />
              </Flex>

              <QuantityPicker
                stock={variant.stock?.quantity}
                quantity={variant.quantity}
                onIncrease={() => handleQuantityChange(variant.variant._id, variantsQuantity[variant.variant._id + item.product._id] + 1, item.product._id, true, item.predefined_quantity)}
                onDecrease={() => handleQuantityChange(variant.variant._id, variantsQuantity[variant.variant._id + item.product._id] - 1, item.product._id, true, item.predefined_quantity)}
                isDisabled={statusCart.isFetching}
              />
            </Box>
          ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}


//REMOVE
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CartPanel: FC<CartPanelProps> = props => {

  const cart = useCartStore(state => state.cart);
  const statusCart = useCartStore(state => state.status)
  const userLogged = useSessionStore(state => state.userLogged);
  const [exceededItems, setExceededItems] = useState<{ label: string, value: string }[]>([]);
  const [showItemError, setShowItemError] = useState(false);
  const { postSale } = SaleAction()
  const [variantsQuantity, setVariantsQuantity] = useState({});
  const status = useSaleStore(state => state.status)

  const { updateQuantity, removeFromCart, getCart } = CartAction();

  const handleQuantityChange = (id: string, value: number, productId: string, isWholesalePackage?: boolean, predefinedQuantity?: number) => {
    if (value < 0) {
      return;
    }
    setVariantsQuantity({ ...variantsQuantity, [id + productId]: value });
    if (value >= 1) {
      onUpdateQuantityPressed(id, value, productId, isWholesalePackage, predefinedQuantity);
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

  const onRemoveFromCartPressed = async (variantId: string, productId?: string, isWholesalePackage?: boolean) => {
    await removeFromCart(cart._id, variantId, productId, isWholesalePackage)
  };

  const onConfirmOrderPressed = () => {
    if (exceededItems.length > 0) {
      toast.error("No se puede realizar la compra debido a que hay productos con stock insuficiente")
      setShowItemError(true);
      return
    }
    postSale({ cartId: cart._id })
  }

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
          acc[variant.variant._id + item.product._id] = variant.quantity;
        });
      }
      return acc;
    }, {}))

  }, [cart]);

  console.log('cart', cart)
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
                            <ProductHeader>
                              <HeadingProduct item={item} />
                              <DeleteButton item={item} onRemoveFromCartPressed={onRemoveFromCartPressed}/>
                            </ProductHeader>

                            <Box>
                              {item.variant ? (
                                <>
                                  <Text fontSize={"sm"} color={"gray.600"} textAlign={"left"} size={"sm"}>Talle: {item.variant.size}</Text>
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
                </HeadingTotalContainer>
                <Divider my={5} />
                <ButtonFinishPurchase status={status} onConfirmOrderPressed={onConfirmOrderPressed} />
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    </>
  );
};

export default CartPanel;