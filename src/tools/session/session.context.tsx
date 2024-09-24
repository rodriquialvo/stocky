import {createContext} from 'react';
import {Session} from './session';

export interface SessionContextInterface {
  session: Session;
  setSession: (session: Session) => void;
}

export const SessionContext = createContext<SessionContextInterface>({
  session: new Session(),
  setSession: () => {},
});
