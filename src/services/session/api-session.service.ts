import {SessionService} from './session.service';
import {Session} from '../../../src/tools/session/session';
import {SessionResponse} from './dtos/session.dto';
import Http from '../http';

export class ApiSessionService implements SessionService {
  private http: Http;
  constructor(private readonly session: Session) {
    this.http = new Http(session.accessToken, 'auth');
  }
  login = (body: {username: string; password: string}) =>
    this.http.post<SessionResponse>('login', body);

  refreshToken = (body: {refreshToken: string}) =>
    this.http.post<SessionResponse>('RefreshToken', body);
}
