import {DefaultTheme} from '@react-navigation/native';
import colors from '../theme/colors';

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
  },
};
