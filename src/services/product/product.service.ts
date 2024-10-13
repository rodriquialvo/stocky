import { ProductFormData } from '../../pages/CreateNewProduct/interfaces';
import { ApiProductService } from './api-product.service';
import { PostProductResponse } from './dtos/product.dto';

export interface ProductService {
  getProducts: (params: {}) => Promise<any>;
  postCreateNewProduct: (body: ProductFormData) => Promise<PostProductResponse>
}

export const useAPIProductService = (): ProductService => {
  return new ApiProductService();
};
