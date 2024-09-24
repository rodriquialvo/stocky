import React, {type FC, type PropsWithChildren, useState} from 'react';
import {plainToInstance} from 'class-transformer';
import {localStore} from '../local-storage/local-storage';
import {SESSION_STORAGE_SESSION_KEY} from './session.hooks';
import {Session} from './session';
import {SessionContext} from './session.context';

const SessionProvider: FC<PropsWithChildren> = props => {
  const stored = localStore.get(SESSION_STORAGE_SESSION_KEY);
  const initialSession = stored
    ? plainToInstance(Session, stored)
    : new Session('');
  const [session, setSession] = useState(initialSession);

  return (
    <SessionContext.Provider value={{session, setSession}}>
        {props.children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
