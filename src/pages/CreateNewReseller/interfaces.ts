export interface CreateNewResellerController {
  /* State */
  example: string;
  /* Events */
  onExamplePressed: () => void;
}

export interface CreateNewResellerProps {
  useController?: () => CreateNewResellerController;
}
