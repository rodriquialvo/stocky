import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  FormLabel,
  Input,
  SimpleGrid,
  Text,
  VStack
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Category } from '../../services/categories/dtos/getCategories';
import { useCategorytore } from '../../store/category/slice';
import { ProductAtributesAction } from '../../store/product-atributes/actions';
import { useProductAtributesStore } from '../../store/product-atributes/slice';
import { ProductAction } from '../../store/product/actions';
import { useSessionStore } from '../../store/session/slice';
import CategoryList from '../CategoryList/CategoryList';
import { initialStateFilters } from './constants';
import { useProductStore } from '../../store/product/slice';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void
}
const FilterPanel: React.FC<FilterPanelProps> = ({ isOpen, onClose }) => {
  // actions
  const { getSizes } = ProductAtributesAction();
  const { setProductsFiltersAction } = ProductAction();

  // stores
  const categories = useCategorytore(state => state.categories);
  const isAdminUser = useSessionStore(state => state.isAdminUser);
  const allColors = useProductAtributesStore(state => state.allColors);

  // local states
  const [isFirstRequest, setIsFirstRequest] = useState(true);
  const [selectedPath, setSelectedPath] = useState<Category[]>([]);
  const [categorySelected, setCategorySelected] = useState<string | null>(null);
  const [currentCategories, setCurrentCategories] = useState<Category[]>(categories);
  const [typeSizeSelected, setTypeSizeSelected] = useState<string>("");
  const [filters, setFilters] = useState(initialStateFilters);
  const [pricesEnabled, setPricesEnabled] = useState({
    cost: false,
    reseller: false,
    retail: false
  });
  const productFilters = useProductStore(state => state.productsFilters);

  useEffect(() => {
    if (!!typeSizeSelected.length) {
      getSizes(typeSizeSelected);
    }
  }, [typeSizeSelected]);

  useEffect(() => {
    onClose();
  },[productFilters]);


  const handleBreadcrumbClick = (category: Category, index: number) => {
    const newPath = selectedPath.slice(0, index + 1);
    setSelectedPath(newPath);
    setCurrentCategories(newPath[index].children || []);
    setCategorySelected(category.id)
    setFilters({ ...filters, categories: [category.id] })
  };

  const onPressedStartCategories = () => {
    setSelectedPath([]);
    setFilters({ ...filters, categories: [] })
    setCurrentCategories(categories);
    setCategorySelected('')
  }

  const handleCategorySelect = (category: Category) => {
    if (category.children && category.children.length > 0) {
      setSelectedPath((prevPath) => [...prevPath, category]);
      setCurrentCategories(category.children);
    }
    setCategorySelected(category.id)
    setFilters({ ...filters, categories: [category.id] })
  };


  const updateField = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };
  const updateArrayField = (key, value, action) => {
    setFilters((prevFilters) => {
      const currentValue = prevFilters[key];

      if (!Array.isArray(currentValue)) {
        console.error(`El campo ${key} no es un array.`);
        return prevFilters;
      }

      switch (action) {
        case "add":
          if (!currentValue.includes(value)) {
            return {
              ...prevFilters,
              [key]: [...currentValue, value],
            };
          }
          return prevFilters;

        case "remove":
          return {
            ...prevFilters,
            [key]: currentValue.filter((item) => item !== value),
          };

        case "set":
        default:
          return {
            ...prevFilters,
            [key]: value, // Reemplaza el array completo
          };
      }
    });
  };

  const onApplyFiltersPressed = () => {
    if (JSON.stringify(filters) !== JSON.stringify(productFilters) || !isFirstRequest) {
      if (isFirstRequest) {
        setIsFirstRequest(false);
      }
      setProductsFiltersAction({ ...filters, minRetailPrice: pricesEnabled.retail ? filters.minRetailPrice : 0, minCostPrice: pricesEnabled.cost ? filters.minCostPrice : 0, minResellerPrice: pricesEnabled.reseller ? filters.minResellerPrice : 0 });
    }
  }

  const onClearFiltersPressed = () => {
    setFilters(initialStateFilters);
    setProductsFiltersAction(initialStateFilters);
    setPricesEnabled({
      cost: false,
      reseller: false,
      retail: false
    })
    setTypeSizeSelected('');
    setCategorySelected(null);
  }


  const filterContent = (
    <VStack py={8} spacing={6} align="normal">
      {isAdminUser && (
        <VStack spacing={4} align="normal">
          <Text fontSize="lg" fontWeight="bold" color="gray.700">
            Configuración de Precios
          </Text>
          
          {/* Precio de Venta Section */}
          <Box 
            p={4} 
            borderWidth="1px" 
            borderRadius="md" 
            borderColor={pricesEnabled.retail ? "pink.200" : "gray.200"}
            transition="all 0.2s"
          >
            <Checkbox 
              isChecked={pricesEnabled.retail} 
              onChange={() => setPricesEnabled({ ...pricesEnabled, retail: !pricesEnabled.retail })} 
              colorScheme="pink"
              size="lg"
              mb={2}
            >
              <Text fontWeight="bold">Precio de venta</Text>
            </Checkbox>
            
            <SimpleGrid columns={2} spacing={4} mt={2}>
              <Box>
                <Text fontSize="sm" mb={1}>Desde</Text>
                <Input
                  type="number"
                  name="minRetailPrice"
                  value={filters.minRetailPrice}
                  onChange={(e) => updateField(e.target.name, e.target.value)}
                  placeholder="Mínimo"
                  isDisabled={!pricesEnabled.retail}
                  size="md"
                />
              </Box>
              <Box>
                <Text fontSize="sm" mb={1}>Hasta</Text>
                <Input
                  type="number"
                  value={filters.maxRetailPrice}
                  name="maxRetailPrice"
                  onChange={(e) => updateField(e.target.name, e.target.value)}
                  placeholder="Máximo"
                  isDisabled={!pricesEnabled.retail}
                  size="md"
                />
              </Box>
            </SimpleGrid>
          </Box>

          {/* Similar structure for Cost and Reseller prices... */}
        </VStack>
      )}

      {/* Categories Section */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" color="gray.700" mb={4}>
          Categorías
        </Text>
        <Box
          width="100%"
          whiteSpace="normal"
          overflowWrap="break-word"
          p={4}
          bg="gray.50"
          borderRadius="md"
        >
          <Breadcrumb separator="›">
            <BreadcrumbItem>
              <BreadcrumbLink 
                onClick={onPressedStartCategories}
                color="pink.500"
                fontWeight="medium"
              >
                Inicio
              </BreadcrumbLink>
            </BreadcrumbItem>
            {selectedPath.map((category, index) => (
              <BreadcrumbItem key={category.id}>
                <BreadcrumbLink
                  borderWidth={categorySelected === category.id ? 2 : 0}
                  borderColor={"pink.100"}
                  px={2}
                  borderRadius={"md"}
                  onClick={() => handleBreadcrumbClick(category, index)}>
                  {category.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            ))}
          </Breadcrumb>
        </Box>
        <CategoryList categorySelected={categorySelected} categories={currentCategories} onCategorySelect={handleCategorySelect} />
      </Box>

      {/* Colors Section */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" color="gray.700" mb={4}>
          Colores
        </Text>
        <SimpleGrid 
          columns={{ base: 2, md: 3, lg: 4 }} 
          spacing={3}
          bg="gray.50"
          p={4}
          borderRadius="md"
        >
          {allColors.map(({ value, label }) => (
            <Box key={value}>
              <Checkbox
                key={value}
                value={value}
                isChecked={filters.color.includes(value)}
                colorScheme={"pink"}
                name='color'
                onChange={(e) => updateArrayField(e.target.name, e.target.value, e.target.checked ? 'add' : 'remove')}
              >
                <Text >{label}</Text>
              </Checkbox>
            </Box>
          ))}

        </SimpleGrid>
      </Box>

      {/* Stock Filter */}
      <Box p={4} bg="gray.50" borderRadius="md">
        <Checkbox
          isChecked={filters.hasStock}
          name="hasStock"
          onChange={(e) => updateField(e.target.name, !filters.hasStock)}
          colorScheme="pink"
          size="lg"
        >
          <Text fontWeight="medium">Solo productos en stock</Text>
        </Checkbox>
      </Box>

      {/* Action Buttons */}
      <VStack spacing={3} w="100%" pt={4}>
        <Button 
          colorScheme="pink" 
          onClick={onApplyFiltersPressed} 
          isDisabled={(JSON.stringify(filters) === JSON.stringify(productFilters))}
          size="lg"
          width="100%"
          _hover={{ transform: 'translateY(-1px)' }}
          transition="all 0.2s"
        >
          Aplicar Filtros
        </Button>
        <Button 
          isDisabled={productFilters === initialStateFilters} 
          variant='outline' 
          colorScheme="pink" 
          onClick={onClearFiltersPressed}
          size="md"
          width="100%"
        >
          Limpiar Filtros
        </Button>
      </VStack>
    </VStack>
  );

  return (
    <Drawer 
      size={{ base: "full", lg: "lg" }} 
      isOpen={isOpen} 
      placement="right" 
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton size="lg" />
        <DrawerBody overflowX="auto">
          {filterContent}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default FilterPanel;
