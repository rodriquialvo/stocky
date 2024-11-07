import { ApiProductAtributesService } from './api-product-atributes.service';
import { GetProductAtributesResponse } from './dtos/getProductAtributes';

export interface ProductService {
  getProductAtributes: (params?: {type?: string}) => Promise<GetProductAtributesResponse>
}

export const useAPIProductAtributesService = (): ProductService => {
  return new ApiProductAtributesService();
};
