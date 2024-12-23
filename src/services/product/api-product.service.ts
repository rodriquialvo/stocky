import { ProductFormData } from '../../pages/CreateNewProduct/interfaces';
import { useSessionStore } from '../../store/session/slice';
import Http from '../http';
import { GetProductAtributesResponse } from './dtos/getProductAtributes';
import { GetProductDetailWhitStocksResponse } from './dtos/getProductDetail';
import { GetProductsResponse } from './dtos/getProducts';
import { PostProductResponse } from './dtos/postCreateNewProduct';
import { ProductService } from './product.service';

export class ApiProductService implements ProductService {
  private http: Http;
  private basicToken = useSessionStore(state => state.basicToken);

  constructor() {
    this.http = new Http(this.basicToken, 'products');
  }

  getProducts = (params?) => this.http.get<GetProductsResponse>('filter', params);

  postCreateNewProduct = (body: ProductFormData) => this.http.post<PostProductResponse>('', body);

  getProductDetail = (id: string, param?: {by?:string} ) => this.http.get<GetProductDetailWhitStocksResponse>(`admin/${id}`, param);

  getProductsByCodeOrName = (q: string) => this.http.get<GetProductsResponse>('filter/products-by-code-or-name', {q});

  getProductAtributes = (params?: {type?: string}) => this.http.get<GetProductAtributesResponse>('', params);

  getCalculatePrices = (params: any) => this.http.get<GetProductAtributesResponse>('calculations/prices', params);

  putIncreasePricesOfProducts = (data: {productsIds: string[], percentageIncrease: number}) => this.http.put<GetProductAtributesResponse>('prices/increase', data);

  updateProduct = (id: string, body: ProductFormData) => this.http.put<PostProductResponse>(id, body);
}
