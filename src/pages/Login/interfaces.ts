export interface LoginController {
  /* State */
  example: string;
  /* Events */
  onExamplePressed: () => void;
}

export interface LoginProps {
  useController?: () => LoginController;
}
