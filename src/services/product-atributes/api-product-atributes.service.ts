import Http from '../http';
import { GetProductAtributesResponse } from './dtos/getProductAtributes';
import { ProductService } from './product-atributes.service';

export class ApiProductAtributesService implements ProductService {
  private http: Http;
  constructor() {
    this.http = new Http('', 'product-attributes');
  }
  getProductAtributes = (params?: {type?: string}) => this.http.get<GetProductAtributesResponse>('', params)
}
