import { ItemListProductProps } from "../../components/ItemListProduct/interfaces";
import { Product } from "../../services/product/dtos/postCreateNewProduct";

export interface ProductController {
  /* State */
  productsViewModel: ItemListProductProps[],
  isOpenIncreaseAndDiscountPanel: boolean,
  isAllproductsSelected: boolean
  currentPage: number,
  totalPages: number,
  isLoading: boolean
  /* Events */
  // handlePrevPage: () => void;
  // handleNextPage: () => void;
  onPressedButtonOpenPanelIncreaseAndDiscount: () => void,
  onClosePanelIncreaseAndDiscount: () => void,
  onSelectAllProducts: () => void
  setCurrentPage: (page: number) => void
}

export interface ProductProps {
  useController?: () => ProductController;
}
