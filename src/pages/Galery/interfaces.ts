export interface GaleryController {
  /* State */
  example: string;
  /* Events */
  onExamplePressed: () => void;
}

export interface GaleryProps {
  useController?: () => GaleryController;
}
