import { ApiCartService } from './api-cart.service';
import { AddToCartRequestDto, CartReponseDto, CreateNewCartRequestDto, RemoveFromCartRequestDto, UpdateQuantityRequestDto } from './dtos/generic';

export interface AddComplexWholesaleProductToCartDTO {
  cartId: string;
  productId: string;
  predefinedQuantity: number;
  variants: {
    variantId: string;
    quantity: number;
  }[];
}

export interface CartService {
  postCreateNewCart: (body: CreateNewCartRequestDto) => Promise<CartReponseDto>,
  postCreateNewCart2: (body: CreateNewCartRequestDto) => Promise<CartReponseDto>,
  postAddToCart: (item: AddToCartRequestDto) => Promise<CartReponseDto>,
  updateQuantity: (req: UpdateQuantityRequestDto) => Promise<CartReponseDto>,
  removeFromCart: (data: RemoveFromCartRequestDto) => Promise<CartReponseDto>,
  getCart: (userId: string) => Promise<CartReponseDto>,
  addComplexWholesaleProduct: (data: AddComplexWholesaleProductToCartDTO) => Promise<CartReponseDto>,
}

export const useAPICartService = (): CartService => {
  return new ApiCartService();
};