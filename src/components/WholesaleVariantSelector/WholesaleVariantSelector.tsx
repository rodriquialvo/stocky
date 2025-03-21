import { Box, Button, Flex, FormControl, FormLabel, HStack, Input, Select, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";

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
}

const WholesaleVariantSelector: React.FC<WholesaleVariantSelectorProps> = ({
  colors,
  sizes,
  stocks,
  totalQuantity,
  onVariantsChange,
  isDisabled = false
}) => {
  const [variants, setVariants] = useState<Variant[]>([]);
  const [remainingQuantity, setRemainingQuantity] = useState(totalQuantity);

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

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
    }

    setVariants(newVariants);
    updateTotalQuantity(newVariants);
  };

  const updateTotalQuantity = (currentVariants: Variant[]) => {
    const total = currentVariants.reduce((sum, variant) => sum + variant.quantity, 0);
    setRemainingQuantity(totalQuantity - total);
    onVariantsChange(currentVariants);
  };

  const getAvailableStock = (color: string, size: string) => {
    const stock = stocks.find(
      s => s.variant.color === color && s.variant.size === size
    );
    return stock?.quantity || 0;
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
            <HStack spacing={4}>
              <FormControl>
                <FormLabel>Color</FormLabel>
                <Select
                  value={variant.color}
                  onChange={(e) => handleVariantChange(index, "color", e.target.value)}
                  isDisabled={isDisabled}
                >
                  <option value="">Seleccionar color</option>
                  {colors.map((color) => (
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
                >
                  <option value="">Seleccionar talle</option>
                  {sizes.map((size) => (
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
                />
              </FormControl>

              <Button
                colorScheme="red"
                variant="ghost"
                onClick={() => handleRemoveVariant(index)}
                isDisabled={isDisabled}
                mt={8}
              >
                Eliminar
              </Button>
            </HStack>
          </Box>
        ))}

        <Flex justify="space-between" align="center">
          <Button
            colorScheme="teal"
            onClick={handleAddVariant}
            isDisabled={isDisabled || remainingQuantity <= 0}
          >
            Agregar Variante
          </Button>
          <Text color={remainingQuantity < 0 ? "red.500" : "gray.500"}>
            Cantidad restante: {remainingQuantity}
          </Text>
        </Flex>
      </VStack>
    </Box>
  );
};

export default WholesaleVariantSelector; 