import Http from '../http';
import { GetCategoriesResponse } from './dtos/getCategories';
import { CategoryService } from './product.service';

export class ApiCategoryService implements CategoryService {
  private http: Http;
  constructor() {
    this.http = new Http('', 'categories');
  }

  getCategories = () => this.http.get<GetCategoriesResponse>('dropdown');
}
