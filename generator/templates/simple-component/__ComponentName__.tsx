import {Box, Text} from '@chakra-ui/react';
import React, {FC} from 'react';
import styles from './__ComponentName__.module.css';
import {__ComponentName__Props} from './interfaces';

//REMOVE
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const __ComponentName__: FC<__ComponentName__Props> = props => {
  return (
    <Box className={styles.root}>
      <Text>__ComponentName__</Text>
    </Box>
  );
};

export default __ComponentName__;
