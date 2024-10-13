import { useState } from "react";
import { Box, Button, HStack, Input, VStack } from "@chakra-ui/react";

interface QuantityPickerProps {
  stock: number;
}

const QuantityPicker: React.FC<QuantityPickerProps> = ({ stock, }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    if (quantity < stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // const handleAddToCart = () => {
  //   onAddToCart(quantity);
  // };

  return (
    <Box>
      {/* Contador de cantidad */}
      <HStack>
        <Button onClick={handleDecrease} isDisabled={quantity <= 1}>-</Button>
        <Input 
          value={quantity} 
          readOnly 
          width="50px" 
          textAlign="center" 
          variant="outline"
        />
        <Button onClick={handleIncrease} isDisabled={quantity >= stock}>+</Button>
      </HStack>

      {/* Botón para agregar al carrito */}
      {/* <Button
        onClick={handleAddToCart}
        colorScheme="blue"
        isDisabled={stock === 0}
      >
        Agregar al carrito
      </Button> */}
    </Box>
  );
};

export default QuantityPicker;
