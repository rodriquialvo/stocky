import {View} from 'react-native';
import React, {FC} from 'react';
import styles from './__ComponentName__.styles';
import {__ComponentName__Props} from './interfaces';
import Text from '../../../src/components/Text/Text';

//REMOVE
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const __ComponentName__: FC<__ComponentName__Props> = props => {
  return (
    <View style={styles.root}>
      <Text>__ComponentName__</Text>
    </View>
  );
};

export default __ComponentName__;
