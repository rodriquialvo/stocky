export interface LoginController {
  /* State */
  email: string;
  password: string;
  isLoading: boolean
  /* Events */
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export interface LoginProps {
  useController?: () => LoginController;
}
