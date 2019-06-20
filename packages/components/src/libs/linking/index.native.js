import { Platform } from 'react-native';

export const getDeepLink = (path = "") => {
  const scheme = 'reactuate';
  const prefix = Platform.OS == 'android' ? `${scheme}://192.168.0.18:5678/` : `${scheme}://`;

  return prefix + path;
};

export const Linking = require('./index-native').Linking; // tslint:disable-line no-var-requires
