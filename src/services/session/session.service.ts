import {useLocalSession} from '../../../src/tools/session/session.hooks';
import {ApiSessionService} from './api-session.service';
import {SessionResponse} from './dtos/session.dto';

export interface SessionService {
  login: (params: {
    username: string;
    password: string;
  }) => Promise<SessionResponse>;
  refreshToken: (params: {refreshToken: string}) => Promise<SessionResponse>;
}

export const useAPISessionService = (): SessionService => {
  const {session} = useLocalSession();
  return new ApiSessionService(session);
};
