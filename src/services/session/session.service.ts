import { useLocalSession } from '../../../src/tools/session/session.hooks';
import { ApiSessionService } from './api-session.service';
import { ResponseRegisterDto } from '../users/dtos/register.dt';
import { ResponseLoginDto } from './dtos/session.dto';

export interface SessionService {
  login: (params: {
    username: string;
    password: string;
  }) => Promise<ResponseLoginDto>;
}

export const useAPISessionService = (): SessionService => {
  const {session} = useLocalSession();
  return new ApiSessionService(session);
};
