import {FC} from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  Text,
  Textarea,
  VStack,
  Badge,
  IconButton
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useCheckoutController} from './Checkout.controller';
import styles from './Checkout.module.css';
import { CheckoutProps } from './interfaces';
import { formattedNumberToMoney } from '../../utils/functions';
import { Item } from '../../services/shoppingcart/dtos/generic';

export const CheckoutPage: FC<CheckoutProps> = props => {
  const {useController = useCheckoutController} = props;
  const controller = useController();

  const {
    formData,
    isSubmitting,
    cart,
    onInputChange,
    onSubmit,
    onBackToCart,
    getPrice
  } = controller;

  return (
    <Box className={styles.checkoutContainer}>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch" className={styles.fadeIn}>
          {/* Header */}
          <Flex justify="space-between" align="center">
            <HStack spacing={4}>
              <IconButton
                aria-label="Volver al carrito"
                icon={<ArrowBackIcon />}
                variant="ghost"
                onClick={onBackToCart}
                _hover={{ bg: "pink.50" }}
              />
              <Heading size="lg" color="#ec0868">
                Finalizar Compra
              </Heading>
            </HStack>
          </Flex>

          <Grid templateColumns={{ base: "1fr", lg: "1fr 400px" }} gap={8}>
            {/* Formulario */}
            <GridItem>
              <Box className={styles.formSection} p={6}>
              <Heading size="md" mb={6} color="gray.700">
                Información de Contacto
              </Heading>
              
              <VStack spacing={4} align="stretch">
                <FormControl isRequired>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    value={formData.name}
                    onChange={(e) => onInputChange('name', e.target.value)}
                    placeholder="Tu nombre completo"
                    size="lg"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Apellido</FormLabel>
                  <Input
                    value={formData.lastname}
                    onChange={(e) => onInputChange('lastname', e.target.value)}
                    placeholder="Tu apellido"
                    size="lg"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => onInputChange('email', e.target.value)}
                    placeholder="tu@email.com"
                    size="lg"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Teléfono (para WhatsApp)</FormLabel>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => onInputChange('phone', e.target.value)}
                    placeholder="+54 9 11 1234-5678"
                    size="lg"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Comentarios adicionales</FormLabel>
                  <Textarea
                    value={formData.comments}
                    onChange={(e) => onInputChange('comments', e.target.value)}
                    placeholder="Comentarios sobre tu pedido..."
                    size="lg"
                    rows={3}
                  />
                </FormControl>
              </VStack>
            </Box>
          </GridItem>

          {/* Resumen del carrito */}
          <GridItem>
            <Box className={styles.cartSection} p={6}>
              <Heading size="md" mb={6} color="gray.700">
                Resumen del Pedido
              </Heading>

              <VStack spacing={4} align="stretch" maxH="60vh" overflowY="auto">
                {cart?.items?.map((item: Item, index: number) => (
                  <Box key={index} className={styles.cartItem} p={4}>
                    <Flex justify="space-between" align="start" mb={2}>
                      <Box flex={1}>
                        <Text fontWeight="semibold" fontSize="sm">
                          {item.product.name}
                        </Text>
                        {item.variant && (
                          <Text fontSize="xs" color="gray.600">
                            {item.variant.color && `Color: ${item.variant.color}`}
                            {item.variant.size && ` | Talle: ${item.variant.size}`}
                          </Text>
                        )}
                        {item.is_wholesale_package && (
                          <Badge colorScheme="green" size="sm" mt={1}>
                            Mayorista
                          </Badge>
                        )}
                      </Box>
                      <Text fontWeight="bold" fontSize="sm">
                        x{item.quantity}
                      </Text>
                    </Flex>
                    
                    <Flex justify="space-between" align="center">
                      <Text fontSize="xs" color="gray.600">
                        {formattedNumberToMoney(getPrice(item))}
                      </Text>
                      <Text fontSize="sm" fontWeight="semibold">
                        {formattedNumberToMoney(getPrice(item) * item.quantity)}
                      </Text>
                    </Flex>
                  </Box>
                ))}
              </VStack>
              {/* Totales */}
              <VStack spacing={3} align="stretch" className={styles.totalSection}>
                <Flex justify="space-between">
                  <Text fontSize="lg" fontWeight="bold">
                    Total:
                  </Text>
                  <Text fontSize="lg" fontWeight="bold" color="#ec0868">
                    {formattedNumberToMoney(cart?.total_retail || 0)}
                  </Text>
                </Flex>
              </VStack>

              <Text fontSize="sm" color="gray.600" textAlign="center" mb={4}>
                💬 Al confirmar, se abrirá WhatsApp con tu pedido pre-escrito
              </Text>
              <Button
                className={styles.confirmButton}
                size="lg"
                width="full"
                onClick={onSubmit}
                isLoading={isSubmitting}
                loadingText="Enviando por WhatsApp..."
                disabled={!cart?.items?.length}
                _hover={{ transform: "translateY(-2px)" }}
                leftIcon={<Box as="span" fontSize="1.2em">📱</Box>}
              >
                Enviar Pedido por WhatsApp
              </Button>
            </Box>
          </GridItem>
        </Grid>
      </VStack>
    </Container>
    </Box>
  );
};
