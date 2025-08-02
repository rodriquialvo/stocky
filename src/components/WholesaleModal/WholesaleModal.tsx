import { Box, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, VStack, Text, Button, Spinner, Flex, Alert, AlertIcon } from "@chakra-ui/react";
import QuantityPicker from "../QuantityPicker/QuantityPicker";
import WholesaleVariantSelector from "../WholesaleVariantSelector/WholesaleVariantSelector";
import { useProductStore } from "../../store/product/slice";
import { useEffect, useState } from "react";
import { useProductAtributesStore } from "../../store/product-atributes/slice";
import { CartAction } from "../../store/shoppingcart/actions";
import { useCartStore } from "../../store/shoppingcart/slice";
import toast from 'react-hot-toast';
import { AddToCartRequestDto, Item } from "../../services/shoppingcart/dtos/generic";
import { AddComplexWholesaleProductToCartDTO } from "../../services/shoppingcart/cart.service";
import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_NUMBER } from "../../constants/importantNumbers";

interface WholesaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemCart?: Item
}

const WholesaleModal: React.FC<WholesaleModalProps> = ({
  isOpen,
  onClose,
  itemCart
}) => {

  const productDetail = useProductStore(state => state.product);
  const cart = useCartStore(state => state.cart);
  const [totalUnits, setTotalUnits] = useState(0);
  const allColors = useProductAtributesStore(state => state.allColors);
  const [sizes, setSizes] = useState<{ label: string, value: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const colors = allColors.filter(color => productDetail?.colors?.includes(color.value)).map(color => { return { label: color.label, value: color.value } })
  const [variants, setVariants] = useState<{ color: string; size: string; sizeLabel: string; colorLabel: string; quantity: number }[]>([]);
  const { addToCartWholesale } = CartAction();
  const [quantity, setQuantity] = useState(1);
  const [totalDozens, setTotalDozens] = useState(0);
  const [predefinedQuantity, setPredefinedQuantity] = useState(1);
  const [isHalfDozen, setIsHalfDozen] = useState(false);

  const totalSelectedQuantity = variants?.reduce((acc, variant) => acc + variant?.quantity, 0);
  const targetQuantity = isHalfDozen ? 6 : quantity * 12;
  const isQuantityExceeded = totalSelectedQuantity > targetQuantity;
  const isQuantityBelowMinimum = totalSelectedQuantity < targetQuantity;

  // Verificar si el usuario llegó al máximo de docenas disponibles
  const isAtMaxDozens = quantity >= totalDozens && totalDozens > 0;

  const isSizeIncluded = (array: { label: string, value: string }[], value: string) => {
    return array.some(stock => stock.value === value);
  }

  useEffect(() => {
    if (productDetail) {
      setTotalUnits(productDetail.stocks.reduce((acc, stock) => acc + stock.quantity, 0) || 0);
      const allSizes = productDetail.stocks?.reduce((acc, stock) => {
        if (!isSizeIncluded(acc, stock.variant.size)) {
          acc.push({ label: stock.variant.sizeLabel, value: stock.variant.size });
        }
        return acc;
      }, [] as { label: string, value: string }[]) || [];
      setSizes(allSizes.map(size => ({ label: size.label, value: size.value })));
    }
  }, [productDetail]);

  useEffect(() => {
    setTotalDozens(Math.floor(totalUnits / 12));
  }, [totalUnits])

  useEffect(() => {
    if (itemCart && productDetail) {
      const wholesaleVariants = itemCart.wholesale_variants.map(variant => ({
        color: variant.variant.color,
        size: variant.variant.size,
        sizeLabel: variant.variant.size_label,
        colorLabel: variant.variant.color_label,
        quantity: variant.quantity
      }));
      setVariants(wholesaleVariants);
      const isHalf = itemCart.predefined_quantity === 6;
      setIsHalfDozen(isHalf);
      setQuantity(isHalf ? 1 : itemCart.predefined_quantity / 12);
      setPredefinedQuantity(itemCart.predefined_quantity);
    }
  }, [itemCart, productDetail]);

  const onVariantsChange = (newVariants: { color: string; size: string; sizeLabel: string; colorLabel: string; quantity: number }[]) => {
    setVariants(newVariants);
  };

  const onAddToCartWholesalePressed = async () => {
    const items = transformVariantsToCartItems();
    if (items.length > 0) {
      try {
        setIsLoading(true);
        await addToCartWholesale({
          cartId: cart._id,
          productId: productDetail?.id || '',
          predefinedQuantity: isHalfDozen ? 6 : quantity * 12,
          variants: items
        } as AddComplexWholesaleProductToCartDTO);

        // Cerrar el modal después de agregar al carrito exitosamente
        onClose();

        // Mostrar mensaje de éxito
        toast.success("Producto agregado al carrito correctamente");
      } catch (error) {
        // Mostrar mensaje de error si algo falla
        toast.error("Error al agregar el producto al carrito");
        console.error("Error al agregar al carrito:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  const transformVariantsToCartItems = () => {
    return variants
      .filter(variant => variant.quantity > 0)
      .map(variant => {
        const stock = productDetail?.stocks.find(
          s => s.variant.color === variant.color && s.variant.size === variant.size
        );
        if (!stock?.variant.id) {
          toast.error(`No se encontró la variante para color ${variant.color} y talle ${variant.sizeLabel}`);
          return null;
        }

        return {
          variantId: stock.variant.id,
          quantity: variant.quantity
        };
      }).filter(Boolean) as { variantId: string; quantity: number }[];
  }

  const onIncrease = () => {
    if (isHalfDozen) {
      setIsHalfDozen(false);
      setQuantity(1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const onDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else if (!isHalfDozen) {
      setIsHalfDozen(true);
    }
  };

  const calculateTotalQuantity = () => {
    if (isHalfDozen) {
      return 6;
    } else {
      return quantity * 12;
    }
  }

  // Función para generar el mensaje de WhatsApp
  const generateWhatsAppMessage = () => {
    const productName = productDetail?.name || 'Producto';
    const totalQuantity = isHalfDozen ? 6 : quantity * 12;
    const quantityText = isHalfDozen ? 'media docena' : `${quantity} docena${quantity > 1 ? 's' : ''}`;
    
    let variantsText = '';
    if (variants.length > 0) {
      const variantsWithQuantity = variants.filter(v => v.quantity > 0);
      if (variantsWithQuantity.length > 0) {
        variantsText = '\n\nVariantes seleccionadas:';
        variantsWithQuantity.forEach(variant => {
          variantsText += `\n• ${variant.colorLabel} - ${variant.sizeLabel}: ${variant.quantity} unidades`;
        });
      }
    }

    const message = `¡Hola! Necesito más cantidad del producto "${productName}". 

Actualmente estoy seleccionando ${quantityText} (${totalQuantity} unidades), pero necesito más stock disponible.

${variantsText}

¿Podrían ayudarme con mayor disponibilidad?`;

    return encodeURIComponent(message);
  };

  const handleWhatsAppContact = () => {
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton
          position="absolute"
          right="10px"
          top="10px"
          zIndex="10"
          color="gray.500"
          bg="white"
          borderRadius="full"
          p="2px"
          _hover={{ bg: "gray.100" }}
        />
        <ModalBody p={6}>
          <Box bg="purple.50" p={6} borderRadius="lg" borderWidth="1px" borderColor="purple.200">
            <VStack align="stretch" spacing={4}>
              <Box>
                <Text fontWeight="bold" mb={2}>
                  Cantidad total {isHalfDozen ? '(media docena)' : '(en docenas)'}
                </Text>
                <Flex>
                  <QuantityPicker
                  stock={totalDozens || 0}
                  quantity={isHalfDozen ? 1/2 : quantity}
                  onIncrease={onIncrease}
                  onDecrease={onDecrease}
                  isDisabled={false}
                  isWholesale={true}
                  minimumQuantity={1}
                />
                <Text fontSize="sm" color="purple.700">Docenas</Text>
                </Flex>
                
                <Text fontSize="sm" color="purple.700" mt={2}>
                  Total: {isHalfDozen ? 6 : quantity * 12} unidades
                </Text>
              </Box>

              {/* Botón de WhatsApp cuando se llega al máximo */}
              {isAtMaxDozens && (
                <Alert status="info" borderRadius="md">
                  <AlertIcon />
                  <Box flex="1">
                    <Text fontWeight="medium" mb={1}>
                      ¿Necesitas más cantidad?
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      Has llegado al máximo disponible. Contáctanos para solicitar más stock.
                    </Text>
                  </Box>
                  <Button
                    leftIcon={<FaWhatsapp />}
                    colorScheme="green"
                    size="sm"
                    onClick={handleWhatsAppContact}
                    ml={3}
                  >
                    Contactar por WhatsApp
                  </Button>
                </Alert>
              )}

              <Box>
                <Text fontWeight="bold" mb={4}>Distribuir cantidades por variante</Text>
                <WholesaleVariantSelector
                  colors={colors}
                  sizes={sizes}
                  stocks={productDetail?.stocks || []}
                  totalQuantity={calculateTotalQuantity()}
                  onVariantsChange={onVariantsChange}
                  isDisabled={false}
                  initialVariants={variants}
                />
              </Box>
              <Button
                w={"full"}
                colorScheme={'purple'}
                size="lg"
                onClick={onAddToCartWholesalePressed}
                isDisabled={isQuantityExceeded || isLoading || totalSelectedQuantity < 6 || isQuantityBelowMinimum}
                isLoading={isLoading}
                loadingText="Agregando al carrito..."
              >
                {isQuantityExceeded
                  ? `Cantidad total (${totalSelectedQuantity}) excede el límite (${targetQuantity})`
                  : isQuantityBelowMinimum
                  ? `Cantidad total (${totalSelectedQuantity}) es menor al mínimo requerido (${targetQuantity})`
                  : 'Agregar al carrito mayorista'
                }
              </Button>
            </VStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default WholesaleModal; 