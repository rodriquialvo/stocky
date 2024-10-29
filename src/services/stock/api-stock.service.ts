import Http from '../http';
import { PostStockDto, ResponsePostStockDto, ResponsePostStockMultipleDto } from './dtos/generic';
import { StockService } from './stock.service';

export class ApiStockService implements StockService {
  private http: Http;
  constructor() {
    this.http = new Http('', 'stock');
  }


  postStock = (data: PostStockDto) => this.http.post<ResponsePostStockDto>('', data);
  postStockMultiple = (data: PostStockDto[]) => this.http.post<ResponsePostStockMultipleDto>('multiple', data);
}
