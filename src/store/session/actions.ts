import { useAPISessionService } from '../../services/session/session.service';
import {
  getErrorStatus,
  getStartStatus,
  getSuccessStatus,
} from '../helper/statusStateFactory';
import { useSessionStore } from './slice';

export const SessionAction = () => {
  const sessionService = useAPISessionService();
  const setLoginData = useSessionStore(state => state.setLoginData);
  const setStatus = useSessionStore(state => state.setStatus);
  const setIsAuthenticated = useSessionStore(state => state.setIsAuthenticated);
  const reset = useSessionStore(state => state.reset);

  const login = async (username: string, password: string) => {
    setStatus(getStartStatus());
    try {
      const response = await sessionService.login({username, password});
      if (!response.user) {
        setStatus(getErrorStatus());
        return;
      }
      setLoginData(response);
      setIsAuthenticated(true);
      setStatus(getSuccessStatus());
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    reset();
  };

  return {
    login,
    logout,
  };
};
