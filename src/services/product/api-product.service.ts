import Http from '../http';
import { ProductService } from './product.service';

export class ApiProductService implements ProductService {
  private http: Http;
  constructor() {
    this.http = new Http('', 'products');
  }

  getProducts = async (params: {}): Promise<any | undefined> => {
    const response = await this.http.get<any, any>('', params);
    if (!response.products) {
      return null;
    }
    return response.products;
  };

}
