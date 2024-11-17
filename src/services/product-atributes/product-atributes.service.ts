import { ApiProductAtributesService } from './api-product-atributes.service';
import { GetProductAtributesResponse, GetProductAtributesSubTypesResponse } from './dtos/getProductAtributes';

export interface ProductService {
  getProductAtributes: (params?: {type?: string, subtype?: string}) => Promise<GetProductAtributesResponse>
  getProductAtributesSubTypes: (params?: {type?: string}) => Promise<GetProductAtributesSubTypesResponse>
}

export const useAPIProductAtributesService = (): ProductService => {
  return new ApiProductAtributesService();
};
