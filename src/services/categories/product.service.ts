import { ApiCategoryService } from './api-category.service';
import { GetCategoriesResponse } from './dtos/getCategories';

export interface CategoryService {
  getCategories: () => Promise<GetCategoriesResponse>;
}

export const useAPICategoryService = (): CategoryService => {
  return new ApiCategoryService();
};
