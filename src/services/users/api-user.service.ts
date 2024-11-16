import { useSessionStore } from '../../store/session/slice';
import Http from '../http';
import { CreateUserDto, FilterGetResellersDto, GetResellerSingeResponseDto, GetResellersResponseDto } from './dtos/generic';
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
}
