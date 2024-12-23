import { ProductFormData } from '../../pages/CreateNewProduct/interfaces';
import { ApiProductService } from './api-product.service';
import { GetProductDetailResponse } from './dtos/getProductDetail';
import { GetProductsResponse } from './dtos/getProducts';
import { PostProductResponse } from './dtos/postCreateNewProduct';

export interface ProductService {
  getProducts: (filters) => Promise<GetProductsResponse>;
  postCreateNewProduct: (body: ProductFormData) => Promise<PostProductResponse>
  getProductDetail: (id: string, param?: { by?: string }) => Promise<GetProductDetailResponse>,
  getProductsByCodeOrName: (q: string) => Promise<GetProductsResponse>;
  getCalculatePrices: (params: any) => Promise<any>,
  putIncreasePricesOfProducts: (data: {productsIds: string[], percentageIncrease: number}) => Promise<any>
  updateProduct: (id: string, body: ProductFormData) => Promise<PostProductResponse>
}

export const useAPIProductService = (): ProductService => {
  return new ApiProductService();
};
