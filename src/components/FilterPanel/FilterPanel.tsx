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
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { mapColors } from '../../constants/maps';
import { Category } from '../../services/categories/dtos/getCategories';
import { useCategorytore } from '../../store/category/slice';
import { ProductAtributesAction } from '../../store/product-atributes/actions';
import { useProductAtributesStore } from '../../store/product-atributes/slice';
import { ProductAction } from '../../store/product/actions';
import { useSessionStore } from '../../store/session/slice';
import { capitalizeFirstLetter } from '../../utils/functions';
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
  const sizes = useProductAtributesStore(state => state.sizes);
  const sizesTypes = useProductAtributesStore(state => state.sizesTypes);
  const statusProductAtributes = useProductAtributesStore(state => state.status);
  const categories = useCategorytore(state => state.categories);
  const isAdminUser = useSessionStore(state => state.isAdminUser);

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

  const onSelectSizeType = (sizeType: string) => {
    setTypeSizeSelected(sizeType);
  }

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
      setProductsFiltersAction({...filters, minRetailPrice: pricesEnabled.retail ? filters.minRetailPrice : 0, minCostPrices: pricesEnabled.cost ? filters.minCostPrices : 0, minResellerPrice: pricesEnabled.reseller ? filters.minResellerPrice : 0});
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
    <VStack py={8} spacing={4} align="normal">
      {/* Rango de precios */}
      <Box>
        <Checkbox isChecked={pricesEnabled.retail} onChange={(e) => setPricesEnabled({ ...pricesEnabled, retail: !pricesEnabled.retail })} colorScheme={"pink"}><Text fontWeight={"bold"}>Precio de venta</Text></Checkbox>
        <Text>Desde</Text>
        <Input
          type="number"
          name="minRetailPrice"
          value={filters.minRetailPrice}
          onChange={(e) => updateField(e.target.name, e.target.value)}
          placeholder='Minimo precio de Venta'
          isDisabled={!pricesEnabled.retail}
        />
      </Box>
      <Box>
        <Text >Hasta</Text>
        <Input
          type="number"
          value={filters.maxRetailPrice}
          name="maxRetailPrice"
          onChange={(e) => updateField(e.target.name, e.target.value)}
          placeholder='Maximo precio de venta'
          isDisabled={!pricesEnabled.retail}
        />
      </Box>
      {
        isAdminUser &&
        <>
          <Box>
          <Checkbox isChecked={pricesEnabled.cost} onChange={(e) => setPricesEnabled({ ...pricesEnabled, cost: !pricesEnabled.cost })} colorScheme={"pink"}><Text fontWeight={"bold"}>Precio de Costo</Text></Checkbox>
            <Text>Desde</Text>
            <Input
              type="number"
              name="minCostPrices"
              value={filters.minCostPrices}
              // onChange={(e) => updateField(e.target.name, e.target.value)}
              placeholder='Minimo precio de costo'
              isDisabled={!pricesEnabled.cost}
            />
          </Box>
          <Box>
            <Text >Hasta</Text>
            <Input
              type="number"
              value={filters.maxCostPrices}
              name="maxCostPrices"
              onChange={(e) => updateField(e.target.name, e.target.value)}
              placeholder='Maximo precio de costo'
              isDisabled={!pricesEnabled.cost}
            />
          </Box>
          <Box>
          <Checkbox isChecked={pricesEnabled.reseller} onChange={(e) => setPricesEnabled({ ...pricesEnabled, reseller: !pricesEnabled.reseller })} colorScheme={"pink"}><Text fontWeight={"bold"}>Precio de Reventa</Text></Checkbox>
            <Text>Desde</Text>
            <Input
              type="number"
              name="minResellerPrice"
              value={filters.minResellerPrice}
              onChange={(e) => updateField(e.target.name, e.target.value)}
              placeholder='Minimo precio de Reventa'
              isDisabled={!pricesEnabled.reseller}
            />
          </Box>
          <Box>
            <Text >Hasta</Text>
            <Input
              type="number"
              value={filters.maxResellerPrice}
              name="maxResellerPrice"
              onChange={(e) => updateField(e.target.name, e.target.value)}
              placeholder='Maximo precio de Reventa'
              isDisabled={!pricesEnabled.reseller}
            />
          </Box>
        </>
      }

      {/* Selección de talla */}
      <Box>
        <FormLabel fontWeight={"bold"}>Tipos de talle</FormLabel>
        {sizesTypes.map((sizetype) => (
          <RadioGroup defaultValue=''>
            <Stack spacing={5}>
              <Radio onClick={() => onSelectSizeType(sizetype.value)} isChecked={typeSizeSelected === sizetype.value} colorScheme='pink'>
                <Text >{capitalizeFirstLetter(sizetype.value)}</Text>
              </Radio>
            </Stack>
          </RadioGroup>
        ))}
      </Box>
      {
        !!typeSizeSelected.length &&
        <Box >
          <FormLabel fontWeight={"bold"}>Talles</FormLabel>
          {statusProductAtributes.isFetching &&
            <Spinner />
          }
          {statusProductAtributes.success && sizes.map((size) => (
            <Box>
              <Checkbox
                key={size._id}
                value={size.value}
                name='size'
                checked={filters.size.includes(size.value)}
                isChecked={filters.size.includes(size.value)}
                onChange={(e) => updateArrayField(e.target.name, e.target.value, e.target.checked ? 'add' : 'remove')}
                colorScheme={"pink"}
              >
                <Text >{size.value}</Text>
              </Checkbox>
            </Box>
          ))}
        </Box>
      }
      <Box >
        <FormLabel fontWeight={"bold"}>Colores</FormLabel>
        {Object.entries(mapColors).map(([value, label]) => (
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
      </Box>
      <Box >
        <FormLabel fontWeight={"bold"} htmlFor="category">Categoria</FormLabel>
        <Box
          width="100%"
          whiteSpace="normal"
          overflowWrap="break-word"
          p={4}
        >
          <Breadcrumb separator=" / ">
            <BreadcrumbItem>
              <BreadcrumbLink onClick={onPressedStartCategories}>
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
      {/* Filtro de disponibilidad */}
      <Box>
        <Checkbox
          isChecked={filters.hasStock}
          checked={filters.hasStock}
          name="hasStock"
          onChange={(e) => updateField(e.target.name, !filters.hasStock)}
        >
          Solo en stock
        </Checkbox>
      </Box>

      {/* Botón para aplicar los filtros */}
      <Button colorScheme="pink" onClick={onApplyFiltersPressed} isDisabled={(JSON.stringify(filters) !== JSON.stringify(productFilters))}>
        Aplicar Filtros
      </Button>
      <Button isDisabled={productFilters === initialStateFilters} mt={2} variant='outline'  colorScheme="pink" onClick={onClearFiltersPressed}>
        Limpiar Filtros
      </Button>
    </VStack>
  );

  return (
    <>
      <>
        <Drawer size={{ lg: "lg" }} isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody overflowX="auto">{filterContent}</DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    </>
  );
};

export default FilterPanel;
