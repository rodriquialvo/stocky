import Http from '../http';
import { ProductService } from './product.service';

export class ApiProductService implements ProductService {
  private http: Http;
  constructor() {
    this.http = new Http('', 'products');
  }

  getProducts = async (params: { page: number; limit: number }): Promise<any | undefined> => {
    console.log('limit', params)
    const response = await this.http.get<any, any>('', params);
    if (!response.products) {
      return null;
    }
    return response;
  };

}
