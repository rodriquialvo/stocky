import React, { useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
  VStack,
  Checkbox,
  FormLabel,
  Select,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  useBreakpointValue,
} from '@chakra-ui/react';

interface FilterPanelProps {
  onApplyFilters: (filters: any) => void;
  isOpen: boolean;
  onClose: () => void
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onApplyFilters, isOpen, onClose  }) => {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedSize, setSelectedSize] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  const isMobile = useBreakpointValue({ base: true, md: false });

  const applyFilters = () => {
    const filters = {
      priceRange,
      selectedSize,
      inStockOnly,
    };
    onApplyFilters(filters);
    if (isMobile) onClose();
  };

  const filterContent = (
    <VStack spacing={4} align="start">
      {/* Rango de precios */}
      <Box>
        <FormLabel>Price Range</FormLabel>
        <Slider
          aria-label="price-slider"
          defaultValue={50}
          min={0}
          max={100}
          onChangeEnd={(val) => setPriceRange([0, val])}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Box>From: ${priceRange[0]} - To: ${priceRange[1]}</Box>
      </Box>

      {/* Selección de talla */}
      <Box>
        <FormLabel>Size</FormLabel>
        <Select
          placeholder="Select size"
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
        </Select>
      </Box>

      {/* Filtro de disponibilidad */}
      <Box>
        <Checkbox
          isChecked={inStockOnly}
          onChange={(e) => setInStockOnly(e.target.checked)}
        >
          In Stock Only
        </Checkbox>
      </Box>

      {/* Botón para aplicar los filtros */}
      <Button colorScheme="blue" onClick={applyFilters}>
        Apply Filters
      </Button>
    </VStack>
  );

  return (
    <>
        <>
          <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerBody>{filterContent}</DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
        {/* <Box
          w="300px"
          bg="gray.100"
          p={4}
          borderRight="1px solid"
          borderColor="gray.200"
          h="100vh"
        >
          {filterContent}
        </Box> */}
    </>
  );
};

export default FilterPanel;
