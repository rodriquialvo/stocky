import { Box, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, VStack, Text, Button, Spinner } from "@chakra-ui/react";
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
  const [variants, setVariants] = useState<{ color: string; size: string; quantity: number }[]>([]);
  const { addToCartWholesale } = CartAction();
  const [quantity, setQuantity] = useState(1);
  const [totalDozens, setTotalDozens] = useState(0);
  const [predefinedQuantity, setPredefinedQuantity] = useState(1);
  const [isHalfDozen, setIsHalfDozen] = useState(false);

  const totalSelectedQuantity = variants.reduce((acc, variant) => acc + variant.quantity, 0);
  const targetQuantity = isHalfDozen ? 6 : quantity * 12;
  const isQuantityExceeded = totalSelectedQuantity > targetQuantity;

  useEffect(() => {
    if (productDetail) {
      setTotalUnits(productDetail.stocks.reduce((acc, stock) => acc + stock.quantity, 0) || 0);
      const allSizes = productDetail.stocks?.reduce((acc, stock) => {
        if (!acc.includes(stock.variant.size)) {
          acc.push(stock.variant.size);
        }
        return acc;
      }, [] as string[]) || [];
      setSizes(allSizes.map(size => ({ label: size, value: size })));
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
        quantity: variant.quantity
      }));
      setVariants(wholesaleVariants);
      const isHalf = itemCart.predefined_quantity === 6;
      setIsHalfDozen(isHalf);
      setQuantity(isHalf ? 1 : itemCart.predefined_quantity / 12);
      setPredefinedQuantity(itemCart.predefined_quantity);
    }
  }, [itemCart, productDetail]);

  const onVariantsChange = (newVariants: { color: string; size: string; quantity: number }[]) => {
    // Verificar stock para cada variante
    const hasInsufficientStock = newVariants.some(variant => {
      const stock = productDetail?.stocks.reduce((total, item) => {
        if (item.variant.color === variant.color && item.variant.size === variant.size) {
          return total + item.quantity;
        }
        return total;
      }, 0);
      return variant.quantity > stock;
    });

    if (hasInsufficientStock) {
      toast.error("Alguna variante excede el stock disponible");
      return;
    }

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
          toast.error(`No se encontró la variante para color ${variant.color} y talle ${variant.size}`);
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
                  <Text fontSize="sm" color="purple.700" mt={2}>
                    {totalDozens} docenas disponibles
                  </Text>
                </Text>
                <QuantityPicker
                  stock={totalDozens || 0}
                  quantity={isHalfDozen ? 1/2 : quantity}
                  onIncrease={onIncrease}
                  onDecrease={onDecrease}
                  isDisabled={false}
                  isWholesale={true}
                  minimumQuantity={1}
                />
                <Text fontSize="sm" color="purple.700" mt={2}>
                  Total: {isHalfDozen ? 6 : quantity * 12} unidades
                </Text>
              </Box>
              <Box>
                <Text fontWeight="bold" mb={4}>Distribuir cantidades por variante</Text>
                <WholesaleVariantSelector
                  colors={colors}
                  sizes={sizes}
                  stocks={productDetail?.stocks || []}
                  totalQuantity={isHalfDozen ? 6 : quantity * 12}
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
                isDisabled={isQuantityExceeded || isLoading || totalSelectedQuantity < 6}
                isLoading={isLoading}
                loadingText="Agregando al carrito..."
              >
                {isQuantityExceeded
                  ? `Cantidad total (${totalSelectedQuantity}) excede el límite (${targetQuantity})`
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