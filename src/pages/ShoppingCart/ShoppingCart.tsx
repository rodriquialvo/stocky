import React from 'react';
import { Box, Button, Flex, Text, Image, Stack, Divider } from '@chakra-ui/react';
import { useCartController } from './ShoppingCart.controller';


const ShoppingCartPage: React.FC = () => {
  const controller = useCartController();

  const { cart } = controller;

  return (
    <Box className="max-w-xl mx-auto p-4 bg-gray-50 rounded-lg shadow-lg">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Shopping Cart
      </Text>
  
      {cart.items.length === 0 ? (
        <Text>No items in the cart.</Text>
      ) : (
        cart.items.map((item) => (
          <Flex
          key={item.variant._id}
          className="p-4 mb-4 bg-white rounded-lg border border-gray-200 shadow-sm"
          alignItems="center"
          justifyContent="space-between"
          >
            <Image
              src={item.product.pictures[0]?.url || 'https://picsum.photos/200'}
              alt={item.product.name}
              boxSize="80px"
              objectFit="cover"
              className="rounded-lg"
            />

            <Stack spacing={2} flex="1" ml={4}>
              <Text fontWeight="bold">{item.product.name}</Text>
              <Text>Color: {item.variant.color}</Text>
              <Text>Talle: {item.variant.size}</Text>
              <Text>PU ${item.product.prices.retail}</Text>
              <Text>PT ${item.product.prices.retail * controller.variantsQuantity[item.variant._id]}</Text>
              <Flex>
                <Button
                  onClick={() => controller.handleQuantityChange(item.variant._id, controller.variantsQuantity[item.variant._id] - 1)}
                  size="sm"
                  className="mr-2 bg-gray-200"
                >
                  -
                </Button>
                <Text>{controller.variantsQuantity[item.variant._id]}</Text>
                <Button
                  onClick={() => controller.handleQuantityChange(item.variant._id, controller.variantsQuantity[item.variant._id] + 1)}
                  size="sm"
                  className="ml-2 bg-gray-200"
                >
                  +
                </Button>
              </Flex>
            </Stack>

            <Button
              size="sm"
              colorScheme="red"
              onClick={() => controller.onRemoveFromCartPressed(item.variant._id)}
              className="ml-4"
            >
              Remove
            </Button>
          </Flex>
        ))
      )}

       {/* Divider visual */}
       <Divider my={4} />

      {/* Mostrar el total del carrito */}
      <Flex justifyContent="space-between" mb={4}>
        <Text fontSize="lg" fontWeight="bold">
          Total:
        </Text>
        <Text fontSize="lg" fontWeight="bold">
          ${cart.items.length > 0 ? cart.total.toFixed(2) : 0}
        </Text>
      </Flex>

      {cart.items.length > 0 && (
        <Button colorScheme="teal" className="mt-4 w-full">
          Proceed to Checkout
        </Button>
      )}
    </Box>
  );
};

export default ShoppingCartPage;

