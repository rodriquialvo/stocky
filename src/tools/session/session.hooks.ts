import { useContext } from 'react';
import { localStore } from '../local-storage/local-storage';
import { Session } from './session';
import { SessionContext } from './session.context';

export const SESSION_STORAGE_SESSION_KEY = 'SESSION_STORAGE_SESSION_KEY';

export interface SessionHook {
  session: Session;
  setSessionOnLocalStorage: (session: Session) => void;
  killSession: () => void;
}
export const useLocalSession = (): SessionHook => {
  const {session, setSession} = useContext(SessionContext);

  const setSessionOnLocalStorage = (newSession: Session) => {
    localStore.save(SESSION_STORAGE_SESSION_KEY, newSession).finally();
    setSession(newSession);
  };

  const killSession = () => {
    localStore.delete(SESSION_STORAGE_SESSION_KEY).finally();
    setSession(new Session(''));
  };

  return {
    session,
    setSessionOnLocalStorage,
    killSession,
  };
};
