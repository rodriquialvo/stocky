import { GalleryItemProps } from "../../components/GalleryItem/GaleryItem";

export interface GaleryController {
  /* State */
  productsViewModel: GalleryItemProps[];
  /* Events */
}

export interface GaleryProps {
  useController?: () => GaleryController;
}
