import { ApiProductService } from './api-product.service';

export interface ProductService {
  getProducts: (params: {}) => Promise<any>;
}

export const useAPIProductService = (): ProductService => {
  return new ApiProductService();
};
