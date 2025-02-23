import { Session } from '../../../src/tools/session/session';
import Http from '../http';
import { ResponseRegisterDto } from '../users/dtos/register.dt';
import { ResponseLoginDto } from './dtos/session.dto';
import { SessionService } from './session.service';

export class ApiSessionService implements SessionService {
  private http: Http;
  constructor(private readonly session: Session) {
    this.http = new Http(session.accessToken, 'auth');
  }
  login = (body: {username: string; password: string}) =>
    this.http.post<ResponseLoginDto>('login', body);
  // refreshToken = (body: {refreshToken: string}) =>
  //   this.http.post<SessionResponse>('RefreshToken', body);
}
