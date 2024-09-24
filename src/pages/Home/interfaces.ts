export interface HomeController {
  /* State */
  example: string;
  /* Events */
  onExamplePressed: () => void;
}

export interface HomeProps {
  useController?: () => HomeController;
}
