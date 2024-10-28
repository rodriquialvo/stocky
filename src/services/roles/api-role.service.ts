import { useSessionStore } from '../../store/session/slice';
import Http from '../http';
import { GetRolesResponseDto } from './dtos/generic';
import { RoleService } from './role.service';

export class ApiRoleService implements RoleService {
  private http: Http;
  private basicToken = useSessionStore(state => state.basicToken);

  // todo encode token dinamically
  constructor() {
    this.http = new Http(this.basicToken, 'roles');
  }

  getRoles = () => this.http.get<GetRolesResponseDto>('');

}
