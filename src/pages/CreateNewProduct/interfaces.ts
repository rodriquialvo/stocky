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
  
  /* Events */
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
}

export interface CreateNewProductProps {
  useController?: () => CreateNewProductController;
}

export interface ProductFormData {
  article: string;
  name: string;
  brand: string;
  description: string;
  size: string;
  colors: string[];
  quantity: number;
  costPrice: number;
  finalPrice: number;
  photos: FileList | null; // Added for photos
}