import { useSessionStore } from '../../store/session/slice';
import Http from '../http';
import { CreateSaleRequestDto, GetSalesFilter, PostSaleResponseDto, SaleReponseDto, SalesReponseDto, UpdateStatusRequestDto } from './dtos/generic';
import { SaleService } from './sale.service';

export class ApiSaleService implements SaleService {
  private http: Http;
  private basicToken = useSessionStore(state => state.basicToken);


  // todo encode token dinamically
  constructor() {
    this.http = new Http(this.basicToken, 'sales');
  }

  postSale = (body: CreateSaleRequestDto) => this.http.post<PostSaleResponseDto>('create-guest-sale', {...body, date: new Date().toISOString()});

  updateStatusSale = (saleId: string, data: UpdateStatusRequestDto) => this.http.put<SaleReponseDto>(`${saleId}`, data);

  getSales = (filter: GetSalesFilter) => this.http.get<SalesReponseDto>('', filter);

  findSellersWithSalesInCurrentWeek = () => this.http.get<any>('by/user');
  findProductsInSalesByUser = (user) => this.http.get<any>(`by/user/${user}`);
  findGroupedProductsInCurrentWeek = () => this.http.get<any>('by/products');
}
