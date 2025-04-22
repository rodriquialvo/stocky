import { Box, Button, Flex, FormControl, FormLabel, HStack, Input, Select, Text, VStack, useColorModeValue, Stack, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Variant {
  color: string;
  size: string;
  quantity: number;
  stock: number;
}

interface WholesaleVariantSelectorProps {
  colors: { label: string; value: string }[];
  sizes: { label: string; value: string }[];
  stocks: { variant: { color: string; size: string }; quantity: number }[];
  totalQuantity: number;
  onVariantsChange: (variants: Variant[]) => void;
  isDisabled?: boolean;
  initialVariants?: { color: string; size: string; quantity: number }[];
}

const WholesaleVariantSelector: React.FC<WholesaleVariantSelectorProps> = ({
  colors,
  sizes,
  stocks,
  totalQuantity,
  onVariantsChange,
  isDisabled = false,
  initialVariants = []
}) => {
  const getAvailableStock = (color: string, size: string) => {
    const total = stocks.reduce((total, item) => {
      if (item.variant.color === color && item.variant.size === size) {
        return total + item.quantity;
      }
      return total;
    }, 0);
    return total;
  };

  // Filtrar colores que tienen stock disponible
  const availableColors = colors.filter(color => 
    sizes.some(size => getAvailableStock(color.value, size.value) > 0)
  );

  // Filtrar talles que tienen stock disponible para un color específico
  const getAvailableSizes = (color: string) => {
    return sizes.filter(size => getAvailableStock(color, size.value) > 0);
  };

  const [variants, setVariants] = useState<Variant[]>(initialVariants.map(variant => ({
    ...variant,
    stock: getAvailableStock(variant.color, variant.size)
  })));
  const [remainingQuantity, setRemainingQuantity] = useState(0);
  const toast = useToast();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  useEffect(() => {
    setRemainingQuantity(totalQuantity);
  }, [totalQuantity])

  const handleAddVariant = () => {
    setVariants([...variants, { color: "", size: "", quantity: 0, stock: 0 }]);
  };

  const handleRemoveVariant = (index: number) => {
    const newVariants = variants.filter((_, i) => i !== index);
    setVariants(newVariants);
    updateTotalQuantity(newVariants);
  };

  const handleVariantChange = (index: number, field: keyof Variant, value: string | number) => {
    const newVariants = [...variants];
    newVariants[index] = { ...newVariants[index], [field]: value };

    if (field === "color" || field === "size") {
      const stock = stocks.find(
        s => s.variant.color === newVariants[index].color && s.variant.size === newVariants[index].size
      );
      newVariants[index].stock = stock?.quantity || 0;

      // Validar si la combinación de color y talle ya existe en otra variante
      if (newVariants[index].color && newVariants[index].size) {
        const isDuplicate = newVariants.some((variant, i) => 
          i !== index && 
          variant.color === newVariants[index].color && 
          variant.size === newVariants[index].size
        );

        if (isDuplicate) {
          toast({
            title: "Variante duplicada",
            description: "Esta combinación de color y talle ya ha sido seleccionada",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          // Revertir los cambios
          newVariants[index] = { ...variants[index] };
        }
      }
    } else if (field === "quantity") {
      // Validar si la cantidad excede el stock disponible
      if (newVariants[index].quantity > newVariants[index].stock) {
        toast({
          title: "Stock insuficiente",
          description: `Solo hay ${newVariants[index].stock} unidades disponibles para esta variante`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        // Ajustar la cantidad al stock disponible
        newVariants[index].quantity = newVariants[index].stock;
      }
    }

    setVariants(newVariants);
    updateTotalQuantity(newVariants);
  };

  const updateTotalQuantity = (currentVariants: Variant[]) => {
    const total = currentVariants.reduce((sum, variant) => sum + variant.quantity, 0);
    setRemainingQuantity(totalQuantity - total);
    onVariantsChange(currentVariants);
  };

  return (
    <Box>
      <VStack spacing={4} align="stretch">
        {variants.map((variant, index) => (
          <Box
            key={index}
            p={4}
            bg={bgColor}
            borderWidth="1px"
            borderColor={borderColor}
            borderRadius="md"
          >
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={4}
              align={{ base: "stretch", md: "flex-end" }}
            >
              <FormControl>
                <FormLabel>Color</FormLabel>
                <Select
                  value={variant.color}
                  onChange={(e) => handleVariantChange(index, "color", e.target.value)}
                  isDisabled={isDisabled}
                  size="sm"
                >
                  <option value="">Seleccionar color</option>
                  {availableColors.map((color) => (
                    <option key={color.value} value={color.value}>
                      {color.label}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Talle</FormLabel>
                <Select
                  value={variant.size}
                  onChange={(e) => handleVariantChange(index, "size", e.target.value)}
                  isDisabled={isDisabled || !variant.color}
                  size="sm"
                >
                  <option value="">Seleccionar talle</option>
                  {getAvailableSizes(variant.color).map((size) => (
                    <option key={size.value} value={size.value}>
                      {size.label}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Cantidad</FormLabel>
                <Input
                  type="number"
                  value={variant.quantity}
                  onChange={(e) => handleVariantChange(index, "quantity", parseInt(e.target.value))}
                  min={0}
                  max={variant.stock}
                  isDisabled={isDisabled || !variant.color || !variant.size}
                  size="sm"
                />
              </FormControl>

              <Button
                colorScheme="red"
                variant="ghost"
                onClick={() => handleRemoveVariant(index)}
                isDisabled={isDisabled}
                size="sm"
                height="40px"
                alignSelf={{ base: "flex-end", md: "flex-end" }}
              >
                Eliminar
              </Button>
            </Stack>
          </Box>
        ))}

        <Flex 
          direction={{ base: "column", sm: "row" }}
          justify="space-between" 
          align="center"
          gap={4}
        >
          <Button
            colorScheme="teal"
            onClick={handleAddVariant}
            isDisabled={isDisabled || remainingQuantity <= 0}
            size="sm"
            width={{ base: "100%", sm: "auto" }}
          >
            Agregar Variante
          </Button>
          <Text 
            color={remainingQuantity < 0 ? "red.500" : "gray.500"}
            fontSize="sm"
            textAlign={{ base: "center", sm: "right" }}
          >
            Cantidad restante: {remainingQuantity}
          </Text>
        </Flex>
      </VStack>
    </Box>
  );
};

export default WholesaleVariantSelector; 