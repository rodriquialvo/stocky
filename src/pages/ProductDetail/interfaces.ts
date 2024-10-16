import { ProductDetail } from "../../services/product/dtos/getProductDetail";

export interface ProductDetailController {
  /* State */
  productDetail: ProductDetail | null
    /* Events */
}

export interface ProductDetailProps {
  useController?: () => ProductDetailController;
}
