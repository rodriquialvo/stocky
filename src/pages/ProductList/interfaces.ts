import { ItemListProductProps } from "../../components/ItemListProduct/interfaces";
import { Product } from "../../services/product/dtos/postCreateNewProduct";

export interface ProductController {
  /* State */
  productsViewModel: ItemListProductProps[]

  /* Events */
  // handlePrevPage: () => void;
  // handleNextPage: () => void;
}

export interface ProductProps {
  useController?: () => ProductController;
}
