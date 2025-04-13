import { Box, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, VStack, Text, Button } from "@chakra-ui/react";
import QuantityPicker from "../QuantityPicker/QuantityPicker";
import WholesaleVariantSelector from "../WholesaleVariantSelector/WholesaleVariantSelector";
import { useProductStore } from "../../store/product/slice";
import { useEffect, useState } from "react";
import { useProductAtributesStore } from "../../store/product-atributes/slice";
import { CartAction } from "../../store/shoppingcart/actions";
import toast from 'react-hot-toast';
import { AddToCartRequestDto, Item } from "../../services/shoppingcart/dtos/generic";

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
  const [totalUnits, setTotalUnits] = useState(0);
  const allColors = useProductAtributesStore(state => state.allColors);
  const [sizes, setSizes] = useState<{ label: string, value: string }[]>([]);

  const colors = allColors.filter(color => productDetail?.colors?.includes(color.value)).map(color => { return { label: color.label, value: color.value } })
  const [variants, setVariants] = useState<{ color: string; size: string; quantity: number }[]>([]);
  const { addToCartWholesale } = CartAction();
  const [quantity, setQuantity] = useState(1);
  const [totalDozens, setTotalDozens] = useState(0);
  const [predefinedQuantity, setPredefinedQuantity] = useState(1);

    useEffect(() => {
      setTotalUnits(productDetail?.stocks.reduce((acc, stock) => acc + stock.quantity, 0) || 0)
      const allSizes = productDetail?.stocks?.reduce((acc, stock) => {
        if (!acc.includes(stock.variant.size)) {
          acc.push(stock.variant.size);
        }
        return acc;
      }, [] as string[]) || [];
      setSizes(allSizes.map(size => ({ label: size, value: size })));
    }, [productDetail])

  useEffect(() => {
    setTotalDozens(Math.floor(totalUnits / 12));
  }, [totalUnits])

  useEffect(() => {
    if (itemCart) {
      const wholesaleVariants = itemCart.wholesale_variants.map(variant => ({
        color: variant.variant.color,
        size: variant.variant.size,
        quantity: variant.quantity
      }));
      setVariants(wholesaleVariants);
      setQuantity(itemCart.predefined_quantity / 12);
      setPredefinedQuantity(itemCart.predefined_quantity);
    }
  }, [itemCart]);

  const onVariantsChange = (newVariants: { color: string; size: string; quantity: number }[]) => {
    setVariants(newVariants);
  };

  const onAddToCartWholesalePressed = () => {
    const items = transformVariantsToCartItems();
    addToCartWholesale(items.map(element => ({
      ...element,
      isWholesalePackage: true,
      predefinedQuantity: quantity * 12
    })))
  }

  const transformVariantsToCartItems = () => {
    return variants.map(variant => {
      const stock = productDetail?.stocks.find(
        s => s.variant.color === variant.color && s.variant.size === variant.size
      );
      if (!stock?.variant.id) {
        toast.error(`No se encontró la variante para color ${variant.color} y talle ${variant.size}`);
        return null;
      }

      return {
        productId: productDetail?.id || '',
        variantId: stock.variant.id,
        quantity: variant.quantity
      };
    }).filter(Boolean) as AddToCartRequestDto[];
  }

  const onIncrease = () => {
    setQuantity(quantity + 1);
  };

  const onDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody p={6}>
          <Box bg="purple.50" p={6} borderRadius="lg" borderWidth="1px" borderColor="purple.200">
            <VStack align="stretch" spacing={4}>
              <Box>
                <Text fontWeight="bold" mb={2}>
                  Cantidad total (en docenas)
                  <Text fontSize="sm" color="purple.700" mt={2}>
                    {totalDozens} docenas disponibles
                  </Text>
                </Text>
                <QuantityPicker
                  stock={totalDozens || 0}
                  quantity={quantity}
                  onIncrease={onIncrease}
                  onDecrease={onDecrease}
                  isDisabled={false}
                  isWholesale={true}
                  minimumQuantity={1}
                />
                <Text fontSize="sm" color="purple.700" mt={2}>
                  Total: {quantity * 12} unidades
                </Text>
              </Box>
              <Box>
                <Text fontWeight="bold" mb={4}>Distribuir cantidades por variante</Text>
                <WholesaleVariantSelector
                  colors={colors}
                  sizes={sizes}
                  stocks={productDetail?.stocks || []}
                  totalQuantity={quantity * 12}
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
              >
                Agregar al carrito mayorista
              </Button>
            </VStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default WholesaleModal; 