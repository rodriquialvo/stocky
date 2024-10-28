import { ProductFormData } from '../../pages/CreateNewProduct/interfaces';
import Http from '../http';
import { GetProductDetailWhitStocksResponse } from './dtos/getProductDetail';
import { GetProductsResponse } from './dtos/getProducts';
import { PostProductResponse } from './dtos/postCreateNewProduct';
import { ProductService } from './product.service';

export class ApiProductService implements ProductService {
  private http: Http;
  constructor() {
    this.http = new Http('', 'products');
  }

  getProducts = (params?) => this.http.get<GetProductsResponse>('filter', params);

  postCreateNewProduct = (body: ProductFormData) => this.http.post<PostProductResponse>('', body);

  getProductDetail = (id: string, param?: {by?:string} ) => this.http.get<GetProductDetailWhitStocksResponse>(`admin/${id}`, {by:'variant'});
}
