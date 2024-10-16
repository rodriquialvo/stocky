import { ProductFormData } from '../../pages/CreateNewProduct/interfaces';
import { ApiProductService } from './api-product.service';
import { GetProductDetailResponse } from './dtos/getProductDetail';
import { GetProductsResponse } from './dtos/getProducts';
import { PostProductResponse } from './dtos/postCreateNewProduct';

export interface ProductService {
  getProducts: () => Promise<GetProductsResponse>;
  postCreateNewProduct: (body: ProductFormData) => Promise<PostProductResponse>
  getProductDetail: (id: string) => Promise<GetProductDetailResponse>
}

export const useAPIProductService = (): ProductService => {
  return new ApiProductService();
};
