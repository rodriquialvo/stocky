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
  isSimpleWholesale?: boolean;
  disableButtons?: boolean;
}

const QuantityPicker: React.FC<QuantityPickerProps> = ({
    stock,
    quantity,
    onIncrease,
    onDecrease,
    isDisabled = false,
    isWholesale = false,
    minimumQuantity = 6,
    isSimpleWholesale = false,
    disableButtons = false
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

  const validWholesaleValues = [0, 6, 12, 24, 36, 48];

  const handleIncrease = () => {
    if (isSimpleWholesale) {
      const currentIndex = validWholesaleValues.indexOf(quantity);
      const nextIndex = currentIndex < validWholesaleValues.length - 1 ? currentIndex + 1 : currentIndex;
      const nextQty = validWholesaleValues[nextIndex];
      if (nextQty <= stock) {
        onIncrease();
      }
    } else {
      onIncrease();
    }
  };

  const handleDecrease = () => {
    if (isSimpleWholesale) {
      const currentIndex = validWholesaleValues.indexOf(quantity);
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
      const prevQty = validWholesaleValues[prevIndex];
      if (prevQty >= 0) {
        onDecrease();
      }
    } else {
      onDecrease();
    }
  };

  return (
    <Box>
      <HStack spacing={1} align="center">
        <Tooltip label="Disminuir cantidad" openDelay={500}>
          <Button 
            onClick={handleDecrease} 
            isDisabled={(quantity <= 0) || isDisabled || disableButtons}
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
            width="50px"
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
            onClick={handleIncrease} 
            isDisabled={(quantity >= stock) || isDisabled || disableButtons}
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
      
      {isNearMax && !isSimpleWholesale && stock > 0 && (
        <Text fontSize="xs" color={warningColor} mt={1}>
          Quedan solo {stock - quantity} disponibles
        </Text>
      )}
      
      {isWholesale && !isSimpleWholesale && (
        <Text fontSize="xs" color="gray.500" mt={1}>
          Cantidades disponibles: 6, 12, 24, 36, 48...
        </Text>
      )}
    </Box>
  );
};

export default QuantityPicker;
