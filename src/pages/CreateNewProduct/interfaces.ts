import { ImageListType } from "react-images-uploading";
import { Category } from "../../services/categories/dtos/getCategories";
import { Dispatch, SetStateAction } from "react";

export interface CreateNewProductController {
  /* State */
  formData: ProductFormData;
  isLoading: boolean
  images: ImageListType,
  categories: Category[],
  selectedPath: Category[],
  categorySelected: string | null,
  currentCategories: Category[]
  selectedColors: string[];
  colors: { label: string, value: string }[]
  sizesOptions: { label: string, value: string }[]
  isDisabledButtonSubmit: boolean

  /* Events */
  setImages: (imageList: ImageListType) => void
  handleSubmit: (e: React.FormEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (selectedOption: any, fieldName: string) => void;
  handleColorsChange: (selectedOptions: any) => void
  handleChangePriceRetail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCategoriesChange: (selectedOptions: any) => void
  handleChangeBrand: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleChangeCode: (e: React.ChangeEvent<HTMLInputElement>) => void
  onPressedStartCategories: () => void,
  handleBreadcrumbClick: (category: Category, index: number) => void,
  handleCategorySelect: (category: Category) => void,
  handleChangePriceResseller: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedColors: Dispatch<SetStateAction<string[]>>;
  selectedSizes: string[],
  setSelectedSizes: Dispatch<SetStateAction<string[]>>;
}

export interface CreateNewProductProps {
  useController?: () => CreateNewProductController;
}

export interface ProductFormData {
  name: string;
  code: string;
  description: string;
  categories: string[];
  attributes: Attributes;
  pictures: ImageListType | Picture[];
  prices: Prices;
  colors: string[],
  sizes: string[]
}

export interface Attributes {
  brand: string;
}

export interface Picture {
  url: string;
  alt_text: string;
}

export interface Prices {
  retail: number;
  reseller: number;
}