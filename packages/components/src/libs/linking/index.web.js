import { Platform } from '../platform'

export const Linking = Platform.isElectron
  ? require('./index-electron').Linking // tslint:disable-line no-var-requires
  : require('./index-native').Linking; // tslint:disable-line no-var-requires
