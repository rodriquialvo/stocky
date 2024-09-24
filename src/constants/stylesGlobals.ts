import {StyleSheet} from 'react-native';
import colors from '../theme/colors';

export const stylesGlobals = StyleSheet.create({
  headerTitleStyle: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerTitleStyleAuth: {
    color: colors.white,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const headerStyle = {
  primary: {
    backgroundColor: colors.primary,
    barStyle: 'dark-content',
  },
  white: {
    backgroundColor: colors.primary,
    barStyle: 'dark-content',
  },
};
