// CategoryList.tsx
import React from "react";
import { Box, Button, SimpleGrid } from "@chakra-ui/react";


export interface Category {
  id: string;
  name: string;
  children?: Category[];
}

interface CategoryListProps {
  categories: Category[];
  onCategorySelect: (category: Category) => void;
  categorySelected?: string | undefined;
  colorText?: string
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, onCategorySelect, categorySelected, colorText }) => {
  return (
    <SimpleGrid
      justifyContent={"center"}
      spacing={4}
      my={4}
    >
      {categories.map((category) => (
        <CategoryItem colorText={colorText}  categorySelected={categorySelected} key={category.id} category={category} onCategorySelect={onCategorySelect} />
      ))}
    </SimpleGrid>
  );
};

interface CategoryItemProps {
  category: Category;
  onCategorySelect: (category: Category) => void;
  categorySelected?: string | undefined;
  colorText?: string
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category, onCategorySelect, categorySelected, colorText }) => {
  return (
    <Box>
      <Button
        px={2}
        borderWidth={categorySelected === category.id ? 2 : 0}
        borderColor={"pink.100"}
        variant="link" onClick={() => onCategorySelect(category)}
        mx={2}
        color={colorText}
        >
        {category.name}
      </Button>
    </Box>
  );
};

export default CategoryList;
