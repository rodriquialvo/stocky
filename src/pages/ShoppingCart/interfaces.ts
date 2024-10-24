import { Cart, VariantsQuantityDto } from "../../services/shoppingcart/dtos/generic";

export interface CartController {
  cart: Cart;
  variantsQuantity: VariantsQuantityDto,
  onUpdateQuantityPressed: (item: any, value: number) => void;
  onRemoveFromCartPressed: (variantId: string) => void;
  handleQuantityChange: (id: string, value: number) => void
}

export interface CartProps {
  useController?: () => CartController;
}