import React, {FC} from 'react';
import {useLoginController} from './Login.controller';
import styles from './Login.module.css'; // Importar el archivo CSS module
import { LoginProps } from './interfaces';

export const LoginPage: FC<
  LoginProps
> = props => {
  const {useController = useLoginController} = props;
  const controller = useController();

  // Render
  return (
    <div>
      <h1>{controller.example}</h1>
    </div>
  );
};
