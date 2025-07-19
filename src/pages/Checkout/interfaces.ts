export interface CheckoutFormData {
  nombre: string;
  email: string;
  telefono: string;
  comentarios: string;
}

export interface CheckoutController {
  /* State */
  formData: CheckoutFormData;
  isSubmitting: boolean;
  cart: any;
  /* Events */
  onInputChange: (field: keyof CheckoutFormData, value: string) => void;
  onSubmit: () => void;
  onBackToCart: () => void;
}

export interface CheckoutProps {
  useController?: () => CheckoutController;
}
