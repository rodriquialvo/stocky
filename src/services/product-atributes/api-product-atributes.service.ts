import Http from '../http';
import { GetProductAtributesResponse, GetProductAtributesSubTypesResponse } from './dtos/getProductAtributes';
import { ProductService } from './product-atributes.service';

export class ApiProductAtributesService implements ProductService {
  private http: Http;
  constructor() {
    this.http = new Http('', 'product-attributes');
  }
  getProductAtributes = (params?: {type: string, subtype?: string}) => this.http.get<GetProductAtributesResponse>('', params)
  getProductAtributesSubTypes = (params?: {type?: string}) => this.http.get<GetProductAtributesSubTypesResponse>('subtypes', params)
}
