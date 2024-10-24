import { ImageListType } from "react-images-uploading";

export interface CreateNewProductController {
  /* State */
  formData: ProductFormData;
  brands: { label: string; value: string }[];
  sizes: { label: string; value: string }[];
  colors: { label: string; value: string }[];
  isSizeOpen: boolean;
  isColorOpen: boolean;
  isBrandOpen: boolean;
  newBrand: string;
  newSize: string;
  newColor: string;
  categories: { label: string; value: string }[];
  isLoading: boolean
  images: ImageListType,
  
  /* Events */
  setImages: (imageList: ImageListType) => void
  setNewBrand: (value: string) => void;
  setNewSize: (value: string) => void;
  setNewColor: (value: string) => void;
  addBrand: () => void;
  onColorClose: () => void;
  onBrandClose: () => void;
  onSizeClose: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (selectedOption: any, fieldName: string) => void;
  onBrandOpen: () => void;
  onSizeOpen: () => void;
  handleColorsChange: (selectedOptions: any) => void
  onColorOpen: () => void;
  handleNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addSize: () => void;
  addColor: () => void;
  handleCategoriesChange: (selectedOptions: any) => void
}

export interface CreateNewProductProps {
  useController?: () => CreateNewProductController;
}

export interface ProductFormData {
  name:        string;
  code:        string;
  description: string;
  categories:  string[];
  attributes:  Attributes;
  pictures:    ImageListType | Picture[];
  prices:      Prices;
}

export interface Attributes {
  brand: string;
}

export interface Picture {
  url:      string;
  alt_text: string;
}

export interface Prices {
  retail:   number;
  reseller: number;
}