import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, Button, HStack, Input, Text, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { useState, useEffect } from "react";

interface QuantityPickerProps {
  stock: number;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  isDisabled?: boolean;
  isWholesale?: boolean;
  minimumQuantity?: number;
}

const QuantityPicker: React.FC<QuantityPickerProps> = ({
    stock,
    quantity,
    onIncrease,
    onDecrease,
    isDisabled = false,
    isWholesale = false,
    minimumQuantity = 6
  }) => {

  const [isNearMax, setIsNearMax] = useState(false);
  
  const buttonBg = useColorModeValue("gray.100", "gray.700");
  const buttonHoverBg = useColorModeValue("gray.200", "gray.600");
  const inputBg = useColorModeValue("white", "gray.800");
  const warningColor = useColorModeValue("orange.500", "orange.300");

  useEffect(() => {
    // Consideramos "cerca del máximo" cuando estamos al 80% del stock
    setIsNearMax(quantity >= stock * 0.8);
  }, [quantity, stock]);

  const isValidQuantity = (qty: number) => {
    if (!isWholesale) return true;
    // Para venta mayorista, solo permitimos múltiplos de 12 o 6
    return qty === 6 || qty % 12 === 0;
  };

  const getNextValidQuantity = (currentQty: number) => {
    if (!isWholesale) return currentQty + 1;
    if (currentQty === 6) return 12;
    return currentQty + 12;
  };

  const getPrevValidQuantity = (currentQty: number) => {
    if (!isWholesale) return currentQty - 1;
    if (currentQty === 12) return 6;
    return currentQty - 12;
  };

  return (
    <Box>
      <HStack spacing={1} align="center">
        <Tooltip label="Disminuir cantidad" openDelay={500}>
          <Button 
            onClick={onDecrease} 
            isDisabled={(quantity <= minimumQuantity) || isDisabled}
            size="sm"
            borderRadius="md"
            bg={buttonBg}
            _hover={{ bg: buttonHoverBg }}
            leftIcon={<MinusIcon boxSize="10px" />}
            aria-label="Disminuir cantidad"
            transition="all 0.2s"
          >
          </Button>
        </Tooltip>
        
        <Tooltip label={`${quantity} de ${stock} disponibles`}>
          <Input
            value={quantity}
            readOnly
            width="45px"
            textAlign="center"
            variant="filled"
            size="sm"
            bg={inputBg}
            borderRadius="md"
            fontWeight="bold"
            disabled={isDisabled}
            color={isNearMax ? warningColor : undefined}
            _hover={{ cursor: "default" }}
          />
        </Tooltip>
        
        <Tooltip label={quantity >= stock ? "Stock máximo alcanzado" : "Aumentar cantidad"} openDelay={500}>
          <Button 
            onClick={onIncrease} 
            isDisabled={(quantity >= stock) || isDisabled}
            size="sm"
            borderRadius="md"
            bg={buttonBg}
            _hover={{ bg: buttonHoverBg }}
            leftIcon={<AddIcon boxSize="10px" />}
            aria-label="Aumentar cantidad"
            transition="all 0.2s"
          >
          </Button>
        </Tooltip>
      </HStack>
      
      {isNearMax && (
        <Text fontSize="xs" color={warningColor} mt={1}>
          Quedan solo {stock - quantity} disponibles
        </Text>
      )}
      {isWholesale && (
        <Text fontSize="xs" color="gray.500" mt={1}>
          Cantidades disponibles: 6, 12, 24, 36, 48...
        </Text>
      )}
    </Box>
  );
};

export default QuantityPicker;
