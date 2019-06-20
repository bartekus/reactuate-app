import { Platform as _Platform } from 'react-native';

export const Platform = {
    ..._Platform,
    isElectron: false,
    isStandalone: true,
    realOS: _Platform.OS,
    selectUsingRealOS(specifics, _options) { return _Platform.select(specifics) }
};
