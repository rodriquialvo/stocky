import {useUsersStore} from './slice';
import {
  getErrorStatus,
  getStartStatus,
  getSuccessStatus,
} from '../helper/statusStateFactory';
import {Session} from '../../tools/session/session';
import {useLocalSession} from '../../tools/session/session.hooks';
import { useAPISessionService } from '../../services/session/session.service';

export const SessionAction = () => {
  const sessionService = useAPISessionService();
  const setUserLogged = useUsersStore(state => state.setUserLogged);
  const setStatus = useUsersStore(state => state.setStatus);

  const {setSessionOnLocalStorage, session} = useLocalSession();

  const login = async (username: string, password: string) => {
    setStatus(getStartStatus());
    try {
      const response = await sessionService.login({username, password});
      if (!response.success) {
        setStatus(getErrorStatus(response.message));
        return;
      }
      setSessionOnLocalStorage(
        new Session(response.token, response.refreshToken),
      );
      setUserLogged(response.user);
      setStatus(getSuccessStatus());
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  };

  const refreshToken = async () => {
    setStatus(getStartStatus());
    try {
      const response = await sessionService.refreshToken({
        refreshToken: session.accessTokenRefresh!,
      });
      if (!response.success) {
        setStatus(getErrorStatus(response.message));
        return;
      }
      setSessionOnLocalStorage(
        new Session(response.token, session.accessTokenRefresh),
      );
      setStatus(getSuccessStatus());
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  };

  return {
    login,
    refreshToken,
  };
};
