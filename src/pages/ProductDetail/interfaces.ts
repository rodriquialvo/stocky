export interface ProductDetailController {
  /* State */
  example: string;
  /* Events */
  onExamplePressed: () => void;
}

export interface ProductDetailProps {
  useController?: () => ProductDetailController;
}
