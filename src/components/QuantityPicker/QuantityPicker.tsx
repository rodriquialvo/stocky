import { Box, Button, HStack, Input } from "@chakra-ui/react";

interface QuantityPickerProps {
  stock: number;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const QuantityPicker: React.FC<QuantityPickerProps> = ({
    stock,
    quantity,
    onIncrease,
    onDecrease,
  }) => {

  return (
    <Box>
      <HStack>
        <Button onClick={onDecrease} isDisabled={quantity <= 1}>-</Button>
        <Input
          value={quantity}
          readOnly
          width="50px"
          textAlign="center"
          variant="outline"
        />
        <Button onClick={onIncrease} isDisabled={quantity >= stock}>+</Button>
      </HStack>
    </Box>
  );
};

export default QuantityPicker;
