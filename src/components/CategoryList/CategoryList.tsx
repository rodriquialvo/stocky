// CategoryList.tsx
import React, { useState } from "react";
import { Box, Text, VStack, Button, SimpleGrid } from "@chakra-ui/react";


export interface Category {
  id: string;
  name: string;
  children?: Category[];
}

interface CategoryListProps {
  categories: Category[];
  onCategorySelect: (category: Category) => void;
  categorySelected?: string | undefined;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, onCategorySelect, categorySelected }) => {
  return (
    <SimpleGrid
      justifyContent={"center"}
      spacing={4}
      columns={{ base: 1, lg: 4 }}
      my={4} // Número de columnas según el tamaño de pantalla
    >
      {categories.map((category) => (
        <CategoryItem  categorySelected={categorySelected} key={category.id} category={category} onCategorySelect={onCategorySelect} />
      ))}
    </SimpleGrid>
  );
};

interface CategoryItemProps {
  category: Category;
  onCategorySelect: (category: Category) => void;
  categorySelected?: string | undefined;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category, onCategorySelect, categorySelected }) => {
  return (
    <Box>
      <Button
        px={2}
        borderWidth={categorySelected === category.id ? 2 : 0}
        borderColor={"pink.100"}
        variant="link" onClick={() => onCategorySelect(category)}>
        {category.name}
      </Button>
    </Box>
  );
};

export default CategoryList;
