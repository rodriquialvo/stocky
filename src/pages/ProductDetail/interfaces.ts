import { ProductDetail } from "../../services/product/dtos/getProductDetail";

export interface ParamsOnAddToCartPressed {
  color: string,
  size: string
  quantity: number
}

export interface Variant {
  color: string;
  size: string;
  quantity: number;
}

export interface ProductDetailController {
  /* State */
  productDetail: ProductDetail | null
  isDisabledButton: boolean,
  sizes: { label: string, value: string }[];
  // colors: {label: string, value: string}[];
  imageSelected: string,
  quantity: number,
  size: string, color: string,
  isLoading: boolean,
  colorsProduct: any[],
  isWholesale: boolean,
  minimumQuantity: number,
  variants: Variant[],
  isWholesaleEnabled: boolean,
  /* Events */
  onAddToCartPressed: (data: ParamsOnAddToCartPressed) => void,
  setImageSelected: (image: string) => void,
  handleSelectColor: (event) => void,
  handleSelectSize: (event) => void,
  onIncrease: () => void,
  onDecrease: () => void,
  handleNext: () => void,
  handlePrev: () => void,
  handleVariantsChange: (variants: Variant[]) => void,
  handleWholesaleToggle: () => void
}

export interface ProductDetailProps {
  useController?: () => ProductDetailController;
}
