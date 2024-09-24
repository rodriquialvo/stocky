import {SessionService} from './session.service';
import {Session} from '../../../../../mobile/CCN.Novavizija.Rialex.App/src/tools/session/session';
import Http from '../../../../../mobile/CCN.Novavizija.Rialex.App/src/services/http';
import {SessionResponse} from './dtos/session.dto';

export class ApiSessionService implements SessionService {
  private http: Http;
  constructor(private readonly session: Session) {
    this.http = new Http(session.accessToken, 'Users');
  }
  login = (body: {username: string; password: string}) =>
    this.http.post<SessionResponse>('Login', body);

  refreshToken = (body: {refreshToken: string}) =>
    this.http.post<SessionResponse>('RefreshToken', body);
}
