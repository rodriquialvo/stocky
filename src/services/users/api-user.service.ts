import { useSessionStore } from '../../store/session/slice';
import Http from '../http';
import { CreateUserDto, FilterGetResellersDto, GetResellerSingeResponseDto, GetResellersResponseDto, Reseller } from './dtos/generic';
import { registerBody, ResponseRegisterDto } from './dtos/register.dt';
import { UserService } from './user.service';

export class ApiUserService implements UserService {
  private http: Http;
  private basicToken = useSessionStore(state => state.basicToken);

  // todo encode token dinamically
  constructor() {
    this.http = new Http(this.basicToken, 'users');
  }

  getUsers = (filter: FilterGetResellersDto) => this.http.get<GetResellersResponseDto>('resellers', filter);
  createUser = (reseller: CreateUserDto) => this.http.post<GetResellerSingeResponseDto>('', reseller);
  updateUser = (id: string, reseller: Partial<Reseller>) => this.http.put<GetResellerSingeResponseDto>(id, reseller);
  register = (body: registerBody) => this.http.post<ResponseRegisterDto>('customers', body);
}
