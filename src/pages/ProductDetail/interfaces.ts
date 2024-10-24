import { ProductDetail } from "../../services/product/dtos/getProductDetail";

export interface ParamsOnAddToCartPressed {
  color: string,
  size: string
  quantity: number
}

interface MapColors {
  [key: string]: string
}

export interface ProductDetailController {
  /* State */
  productDetail: ProductDetail | null
  mapColors: MapColors
  /* Events */
  onAddToCartPressed: (data: ParamsOnAddToCartPressed) => void
}

export interface ProductDetailProps {
  useController?: () => ProductDetailController;
}
