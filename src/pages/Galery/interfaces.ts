import { GalleryItemProps } from "../../components/GalleryItem/GaleryItem";

export interface GaleryController {
  /* State */
  productsViewModel: GalleryItemProps[];
  isLoading: boolean,
  totalProducts: number
  /* Events */
  onChangeCurrentPage: (page: number | string) => void
}

export interface GaleryProps {
  useController?: () => GaleryController;
}
