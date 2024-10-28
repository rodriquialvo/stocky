import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, Heading, IconButton, Image, Text } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useSessionStore } from '../../store/session/slice';
import { CartAction } from '../../store/shoppingcart/actions';
import { useCartStore } from '../../store/shoppingcart/slice';
import { capitalizeFirstLetter, formattedNumberToMoney } from '../../utils/functions';
import QuantityPicker from '../QuantityPicker/QuantityPicker';
import { CartPanelProps } from './interfaces';

//REMOVE
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CartPanel: FC<CartPanelProps> = props => {

  const cart = useCartStore(state => state.cart);
  const userLogged = useSessionStore(state => state.userLogged);
  const basicToken = useSessionStore(state => state.basicToken);

  console.log('basic', basicToken);

  const [variantsQuantity, setVariantsQuantity] = useState({});

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

  useEffect(() => {
    if (userLogged?.id) {
      getCart(userLogged.id);
    }
  }, [])

  useEffect(() => {
    setVariantsQuantity(cart?.items?.reduce((acc, item) => ({ ...acc, [item.variant._id]: item.quantity }), {}))
  }, [cart])

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
                          // bg="red"
                          justifyContent={"center"}
                          alignItems={"center"}
                        >
                          <Image
                            src={item.product.pictures[0]?.url || 'https://picsum.photos/200'}
                            alt={item.product.name}
                            boxSize="80px"
                            objectFit="cover"
                            borderRadius={"lg"}
                          />
                          <Box
                            // bg="red"
                            justifyContent={"space-between"}
                            display={"flex"}
                            flexDirection={"column"}
                          >
                            <Heading color={"pink.400"} textAlign={"left"} fontSize="md">{item.product.name}</Heading>
                            <Text fontSize={"sm"} color={"gray.600"} textAlign={"left"} size={"sm"}>Talle: {item.variant.size}</Text>
                            <Text fontSize={"sm"} color={"gray.600"} textAlign={"left"} size={"sm"}>Color: {capitalizeFirstLetter(item.variant.color)}</Text>
                            <Text fontSize={"sm"} color={"gray.600"} textAlign={"left"} size={"sm"}>Precio x unidad: {formattedNumberToMoney(item.product.prices.reseller)}</Text>
                            <QuantityPicker
                              stock={10}
                              quantity={variantsQuantity[item.variant._id]}
                              onIncrease={() => handleQuantityChange(item.variant._id, variantsQuantity[item.variant._id] + 1)}
                              onDecrease={() => handleQuantityChange(item.variant._id, variantsQuantity[item.variant._id] - 1)}
                            />
                          </Box>
                        </Box>
                        <Box
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
                <Heading>Total: {formattedNumberToMoney(cart.total)}</Heading>
                <Divider my={5} />
                <Button
                  // mt={4}
                  w={"full"}
                  colorScheme={'pink'}
                // onClick={() => controller.onAddToCartPressed({ size, color, quantity })}
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
