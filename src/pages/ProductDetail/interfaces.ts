import { ProductDetail, Stock } from "../../services/product/dtos/getProductDetail";
import { AddToCartRequestDto, Item } from "../../services/shoppingcart/dtos/generic";

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
  productDetail: ProductDetail | null;
  statusProduct: { isFetching: boolean };
  statusCart: { isFetching: boolean };
  isDisabledButton: boolean;
  sizes: { label: string; value: string }[];
  imageSelected: string;
  quantity: number;
  selectedSize: string | null;
  selectedColor: string | null;
  color: string;
  size: string;
  isLoading: boolean;
  colorsProduct: { label: string; value: string }[];
  isWholesale: boolean;
  minimumQuantity: number;
  variants: { color: string; size: string; quantity: number }[];
  isWholesaleEnabled: boolean;
  variantSelected: Stock | null;
  totalUnits: number;
  totalDozens: number;
  productItemCart: Item | null;
  isSimpleWholesale: boolean;
  wholesaleMultiplier: number;
  maximumQuantity: number;
  /* Events */
  onAddToCartPressed: (data: ParamsOnAddToCartPressed) => void;
  onAddToCartWholesalePressed: () => void;
  setImageSelected: (image: string) => void;
  handleSelectColor: (event: any) => void;
  handleSelectSize: (event: any) => void;
  onIncrease: () => void;
  onDecrease: () => void;
  handleNext: () => void;
  handlePrev: () => void;
  handleVariantsChange: (variants: { color: string; size: string; quantity: number }[]) => void;
  handleWholesaleToggle: () => void;
  onCloseModalWholeSale: () => void;
  handleWholesaleMultiplierChange: (multiplier: number) => void;
  getWholesaleMultipliers: () => { label: string; value: number }[];
}

export interface ProductDetailProps {
  useController?: () => ProductDetailController;
}
