import Http from '../http';
import { CreateSaleRequestDto, GetSalesFilter, SaleReponseDto, SalesReponseDto, UpdateStatusRequestDto } from './dtos/generic';
import { SaleService } from './sale.service';

export class ApiSaleService implements SaleService {
  private http: Http;

  // todo encode token dinamically
  constructor() {
    this.http = new Http('', 'sales');
  }

  postSale = (body: CreateSaleRequestDto) => this.http.post<SalesReponseDto>('', body);

  updateStatusSale = (saleId: string, data: UpdateStatusRequestDto) => this.http.put<SaleReponseDto>(`${saleId}`, data);

  getSales = (filter: GetSalesFilter) => this.http.get<SalesReponseDto>('', filter);
}
