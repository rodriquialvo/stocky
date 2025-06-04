export interface RegisterController {
  /* State */
  formData: {
    name: string,
    lastname: string,
    password: string,
    email: string,
    birthdate: string,
    dni: string,
    roles: string[]
  },
  isLoading: boolean

  /* Listeners */
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void
}

export interface RegisterProps {
  useController?: () => RegisterController;
}
