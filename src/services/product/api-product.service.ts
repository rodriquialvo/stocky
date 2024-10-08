import { ProductFormData } from '../../pages/CreateNewProduct/interfaces';
import Http from '../http';
import { ProductService } from './product.service';

export class ApiProductService implements ProductService {
  private http: Http;
  constructor() {
    this.http = new Http('', 'stock');
  }

  getProducts = async (params: { page: number; limit: number }): Promise<any | undefined> => {
    const response = await this.http.get<any, any>('', params);
    if (!response.stocks) {
      return null;
    }
    return response;
  };

  postCreateNewProduct = async (body: ProductFormData): Promise<any | undefined> => {
    const response = await this.http.get<any, any>('', body);
    if (!response.products) {
      return null;
    }
    return response;
  };


}
