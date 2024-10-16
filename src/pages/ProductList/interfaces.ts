import { Product } from "../../services/product/dtos/postCreateNewProduct";

export interface ProductController {
  /* State */
  currentPage: number;
  itemsPerPage: number;
  isMobile: boolean;
  products: Product[];
  total: number
  totalPages: number

  /* Events */
  handlePrevPage: () => void;
  handleNextPage: () => void;
}

export interface ProductProps {
  useController?: () => ProductController;
}