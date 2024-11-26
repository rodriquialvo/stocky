import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, Flex, Heading, IconButton, Image, Text } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useSessionStore } from '../../store/session/slice';
import { CartAction } from '../../store/shoppingcart/actions';
import { useCartStore } from '../../store/shoppingcart/slice';
import { capitalizeFirstLetter, formattedNumberToMoney } from '../../utils/functions';
import QuantityPicker from '../QuantityPicker/QuantityPicker';
import { CartPanelProps } from './interfaces';
import { SaleAction } from '../../store/sales/actions';
import { useSaleStore } from '../../store/sales/slice';

//REMOVE
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CartPanel: FC<CartPanelProps> = props => {

  const cart = useCartStore(state => state.cart);
  const statusCart = useCartStore(state => state.status)

  const userLogged = useSessionStore(state => state.userLogged);

  const { postSale } = SaleAction()
  const [variantsQuantity, setVariantsQuantity] = useState({});
  const status = useSaleStore(state => state.status)
  const [totals, setTotals] = useState({
    reseller: 0,
    retail: 0
  });

  const { updateQuantity, removeFromCart, getCart } = CartAction();

  const handleQuantityChange = (id: string, value: number) => {
    if (value < 0) {
      return;
    }
    setVariantsQuantity({ ...variantsQuantity, [id]: value });
    if (value >= 1) {
      onUpdateQuantityPressed(id, value);
    }
  };

  const onUpdateQuantityPressed = async (id: string, value: number) => {
    await updateQuantity({
      params: {
        cartId: cart._id,
        variantId: id
      },
      body: {
        quantity: value
      }
    })
  };

  const onRemoveFromCartPressed = async (variantId: string) => {
    await removeFromCart(cart._id, variantId)
  };

  const onConfirmOrderPressed = () => {
    postSale({ cartId: cart._id })
  }

  useEffect(() => {
    if (userLogged?.id) {
      getCart(userLogged.id);
    }
  }, [])

  useEffect(() => {
    setVariantsQuantity(cart?.items?.reduce((acc, item) => ({ ...acc, [item.variant._id]: item.quantity }), {}))
  }, [cart]);

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
                        // borderWidth={1}
                        flexDirection={"row"}
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
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
                            <Flex
                              alignItems={"center"}
                              justify={"space-between"}
                            >
                              <Heading color={"pink.400"} textAlign={"left"} fontSize="md">{item.product.name}</Heading>
                              <IconButton
                                aria-label='Delete'
                                icon={<DeleteIcon />}
                                onClick={() => onRemoveFromCartPressed(item.variant._id)}
                                variant='ghost'
                              />
                            </Flex>
                            <Text fontSize={"sm"} color={"gray.600"} textAlign={"left"} size={"sm"}>Talle: {item.variant.size}</Text>
                            <Text fontSize={"sm"} color={"gray.600"} textAlign={"left"} size={"sm"}>Color: {capitalizeFirstLetter(item.variant.color)}</Text>
                            <Box
                              display={"flex"}
                              justifyContent={"space-between"}
                              alignItems={"center"}
                              width={"100%"}
                            >
                              <Text fontSize={"sm"} color={"gray.600"} textAlign={"left"} size={"sm"}>Precio revendedor: {formattedNumberToMoney(item.product.prices.reseller)}</Text>
                              <Box
                                display={"flex"}
                                flexDirection={"row"}
                                // justifyContent={"end"}
                                alignItems={"center"}
                              >
                                <Heading fontSize={"md"} >
                                  {formattedNumberToMoney(item.product.prices.reseller * variantsQuantity[item.variant._id])}
                                </Heading>

                              </Box>
                            </Box>
                            <Box
                              display={"flex"}
                              justifyContent={"space-between"}
                              alignItems={"center"}
                              width={"100%"}
                            >
                              <Text fontSize={"sm"} color={"gray.600"} textAlign={"left"} size={"sm"}>Precio final: {formattedNumberToMoney(item.product.prices.retail)}</Text>
                              <Box
                                display={"flex"}
                                flexDirection={"row"}
                                alignItems={"center"}
                              >
                                <Heading fontSize={"md"} >
                                  {formattedNumberToMoney(item.product.prices.retail * variantsQuantity[item.variant._id])}
                                </Heading>

                              </Box>
                            </Box>

                            {/* <Text fontSize={"sm"} color={"gray.600"} textAlign={"left"} size={"sm"}>Precio final: {formattedNumberToMoney(item.product.prices.retail)}</Text> */}
                            <QuantityPicker
                              stock={100}
                              quantity={variantsQuantity[item.variant._id]}
                              onIncrease={() => handleQuantityChange(item.variant._id, variantsQuantity[item.variant._id] + 1)}
                              onDecrease={() => handleQuantityChange(item.variant._id, variantsQuantity[item.variant._id] - 1)}
                              isDisabled={statusCart.isFetching}
                            />
                          </Box>
                        </Box>
                        {/* <Box
                          display={"flex"}
                          flexDirection={"row"}
                          justifyContent={"end"}
                          alignItems={"center"}
                        >
                          <Heading fontSize={"md"} >
                            {formattedNumberToMoney(item.product.prices.reseller * variantsQuantity[item.variant._id])}
                          </Heading>
                          <IconButton
                            aria-label='Delete'
                            icon={<DeleteIcon />}
                            onClick={() => onRemoveFromCartPressed(item.variant._id)}
                            variant='ghost'
                          />
                        </Box> */}

                      </Box>
                      <Divider my={5} />
                    </>
                  )
                })
              }
              <Box
                position="sticky"
              >
                <Heading>Total: {formattedNumberToMoney(cart.total)}</Heading>
                <Divider my={5} />
                <Button
                  isLoading={status.isFetching}
                  w={"full"}
                  colorScheme={'pink'}
                  onClick={onConfirmOrderPressed}
                >Terminar compra</Button>

              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    </>
  );
};

export default CartPanel;
