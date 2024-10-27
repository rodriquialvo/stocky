import { Box, Button, HStack, Input } from "@chakra-ui/react";

interface QuantityPickerProps {
  stock: number;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  isDisabled?: boolean
}

const QuantityPicker: React.FC<QuantityPickerProps> = ({
    stock,
    quantity,
    onIncrease,
    onDecrease,
    isDisabled = false
  }) => {

  return (
    <Box>
      <HStack>
        <Button onClick={onDecrease} isDisabled={(quantity <= 1) || isDisabled}>-</Button>
        <Input
          value={quantity}
          readOnly
          width="50px"
          textAlign="center"
          variant="outline"
          disabled={isDisabled}
        />
        <Button onClick={onIncrease} isDisabled={(quantity >= stock) || isDisabled}>+</Button>
      </HStack>
    </Box>
  );
};

export default QuantityPicker;
