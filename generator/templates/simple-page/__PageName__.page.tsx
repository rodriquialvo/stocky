import React, {FC} from 'react';
import {use__PageName__Controller} from './__PageName__.controller';
import styles from './__PageName__.module.css'; // Importar el archivo CSS module
import { __PageName__Props } from './interfaces';

export const __PageName__Page: FC<
  __PageName__Props
> = props => {
  const {useController = use__PageName__Controller} = props;
  const controller = useController();

  // Render
  return (
    <div>
      <h1>__PageName__</h1>
    </div>
  );
};
