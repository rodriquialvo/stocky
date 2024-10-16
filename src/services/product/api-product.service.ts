import { ProductFormData } from '../../pages/CreateNewProduct/interfaces';
import Http from '../http';
import { GetProductDetailResponse } from './dtos/getProductDetail';
import { GetProductsResponse } from './dtos/getProducts';
import { PostProductResponse } from './dtos/postCreateNewProduct';
import { ProductService } from './product.service';

export class ApiProductService implements ProductService {
  private http: Http;
  constructor() {
    this.http = new Http('', 'products');
  }

  getProducts = (params?) => this.http.get<GetProductsResponse>('', params);

  postCreateNewProduct = (body: ProductFormData) => this.http.post<PostProductResponse>('', body);

  getProductDetail = (id: string) => this.http.get<GetProductDetailResponse>(id);
}
