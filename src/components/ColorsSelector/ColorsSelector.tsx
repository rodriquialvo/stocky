import { Dispatch, SetStateAction, useState } from "react";
import { Box, Checkbox, CheckboxGroup, Tag, Wrap, WrapItem } from "@chakra-ui/react";
import { mapColors } from "../../constants/maps";

interface ColorsSelector {
  selectedColors: string[];
  setSelectedColors: Dispatch<SetStateAction<string[]>>;
}
const ColorsSelector = ({
  selectedColors,
  setSelectedColors
}: ColorsSelector) => {
  const colors = Object.entries(mapColors).map(([value, label]) => ({ label, value }));

  const handleColorChange = (colorValue: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorValue) ? prev.filter((c) => c !== colorValue) : [...prev, colorValue]
    );
  };

  return (
    <Box>
      <CheckboxGroup colorScheme="teal">
        <Wrap spacing="10px">
        {colors.map(({ label, value }) => (
          <WrapItem key={value}>
              <Checkbox
                value={value}
                isChecked={selectedColors.includes(value)}
                onChange={() => handleColorChange(value)}
                >
              {label}
              </Checkbox>
            </WrapItem>
          ))}
        </Wrap>
      </CheckboxGroup>

      <Wrap mt={4}>
        {selectedColors.map((value) => {
          const color = colors.find((c) => c.value === value);
          return (
            <Tag
              key={value}
              colorScheme="teal"
              variant="solid"
              cursor="pointer"
              onClick={() => handleColorChange(value)}
            >
              {color.label} ✕
            </Tag>
          );
        })}
      </Wrap>
    </Box>
  );
};

export default ColorsSelector;
