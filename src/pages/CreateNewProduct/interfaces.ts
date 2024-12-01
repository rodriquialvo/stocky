import { ImageListType } from "react-images-uploading";
import { Category } from "../../services/categories/dtos/getCategories";
import { Dispatch, SetStateAction } from "react";
import { ProductAttribute } from "../../services/product/dtos/getProductAtributes";

export interface CreateNewProductController {
  /* State */
  formData: ProductFormData;
  isLoading: boolean
  images: ImageListType,
  categories: Category[],
  selectedPath: Category[],
  categorySelected: Category | null,
  currentCategories: Category[]
  selectedColors: string[];
  colors: { label: string, value: string }[]
  isDisabledButtonSubmit: boolean,
  sizesTypes: ProductAttribute[]
  allBrands: ProductAttribute[],
  showCategoriesTypesOptions: boolean

  /* Events */
  setImages: (imageList: ImageListType) => void
  handleSubmit: (e: React.FormEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (selectedOption: any, fieldName: string) => void;
  handleColorsChange: (selectedOptions: any) => void
  handleChangePriceRetail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCategoriesChange: (selectedOptions: any) => void
  handleChangeBrand: (brand: string) => void
  handleChangeCode: (e: React.ChangeEvent<HTMLInputElement>) => void
  onPressedStartCategories: () => void,
  handleBreadcrumbClick: (category: Category, index: number) => void,
  handleCategorySelect: (category: Category) => void,
  handleChangeCostPrice: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangePercentageReseller: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangePercentageRetail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedColors: Dispatch<SetStateAction<string[]>>;
  calculatedPrices: any;
  onSelectAllColors: () => void,
  handleColorChange: (colorValue: string) => void
  onSelectSizeType: (value: string) => void,
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
  percentages: Percentages;
  colors: string[],
  sizeType: string
}

export interface Attributes {
  brand: string;
}

export interface Picture {
  url: string;
  alt_text: string;
}

export interface Prices {
  cost: number | string
  retail: number
  reseller: number
}

export interface Percentages {
  retail: number
  reseller: number
}