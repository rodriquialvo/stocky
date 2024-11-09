import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Box, Checkbox, CheckboxGroup, Tag, Wrap, WrapItem } from "@chakra-ui/react";

interface ItemsSelector {
  selectedItems: string[];
  setSelectedItems: Dispatch<SetStateAction<string[]>>;
  items: {label: string, value: string}[]
}
const ItemsSelector = ({
  selectedItems,
  setSelectedItems,
  items
}: ItemsSelector) => {
  const handleItemChange = (value: string, prevValue) => {
    setSelectedItems(() =>
      prevValue.includes(value) ? prevValue.filter((v) => v !== value) : [...prevValue, value]
    );
  };

  return (
    <Box>
      <CheckboxGroup colorScheme="teal">
        <Wrap spacing="10px">
          {items.map(({ label, value }) => (
            <WrapItem key={value}>
              <Checkbox
                value={value}
                isChecked={!!selectedItems.find(e => value === e)}
                onChange={() => handleItemChange(value, selectedItems)}
              >
                {label}
              </Checkbox>
            </WrapItem>
          ))}
        </Wrap>
      </CheckboxGroup>
    </Box>
  );
};

export default ItemsSelector;
