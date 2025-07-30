export interface CheckoutFormData {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
  comments: string;
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
