import { ProductFormData } from '../../pages/CreateNewProduct/interfaces';
import Http from '../http';
import { PostProductResponse } from './dtos/product.dto';
import { ProductService } from './product.service';

export class ApiProductService implements ProductService {
  private http: Http;
  constructor() {
    this.http = new Http('', 'products');
  }

  getProducts = async (params: { page: number; limit: number }): Promise<any | undefined> => {
    const response = await this.http.get<any, any>('', params);
    if (!response.stocks) {
      return null;
    }
    return response;
  };
  postCreateNewProduct = (body: ProductFormData) => this.http.post<PostProductResponse>('', body);
}
