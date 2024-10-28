import { useSessionStore } from '../../store/session/slice';
import Http from '../http';
import { CartService } from './cart.service';
import { AddToCartRequestDto, CartReponseDto, CreateNewCartRequestDto, RemoveFromCartRequestDto, UpdateQuantityRequestDto } from './dtos/generic';

export class ApiCartService implements CartService {
  private http: Http;
  private basicToken = useSessionStore(state => state.basicToken);

  // todo encode token dinamically
  constructor() {
    this.http = new Http(this.basicToken, 'carts');
  }

  postCreateNewCart = (body: CreateNewCartRequestDto) => this.http.post<CartReponseDto>('', body);

  postAddToCart = (item: AddToCartRequestDto) => this.http.post<CartReponseDto>('add-product', item);

  updateQuantity = ({ body: { quantity: value }, params: { cartId, variantId } }: UpdateQuantityRequestDto) => this.http.put<CartReponseDto>(`${cartId}/update-quantity/${variantId}`, {
    quantity: value
  });

  removeFromCart = ({ cartId, variantId }: RemoveFromCartRequestDto) => this.http.delete<CartReponseDto>(`${cartId}/remove-product/${variantId}`);

  getCart = (userId: string) => this.http.get<CartReponseDto>(`user/${userId}`);
}
