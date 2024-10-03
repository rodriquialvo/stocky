import { ProductFormData } from '../../pages/CreateNewProduct/interfaces';
import { ApiProductService } from './api-product.service';

export interface ProductService {
  getProducts: (params: {}) => Promise<any>;
  postCreateNewProduct: (body: ProductFormData) => Promise<any>
}

export const useAPIProductService = (): ProductService => {
  return new ApiProductService();
};
