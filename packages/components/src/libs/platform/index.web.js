import { Platform as _Platform } from 'react-native'

// From: https://github.com/cheton/is-electron
function isElectron() {
  if (
    !(typeof window !== 'undefined' && window.reactuate === true && !!window.ipc)
  ) {
    return false
  }

  if (
    typeof window !== 'undefined' &&
    typeof window.process === 'object' &&
    window.process.type === 'renderer'
  ) {
    return true
  }

  if (
    typeof process !== 'undefined' &&
    typeof process.versions === 'object' &&
    !!process.versions.electron
  ) {
    return true
  }

  if (
    typeof navigator === 'object' &&
    typeof navigator.userAgent === 'string' &&
    navigator.userAgent.indexOf('Electron') >= 0
  ) {
    return true
  }

  return false
}

function getOSName() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/android/i.test(userAgent)) return 'android';

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return 'ios';

  return 'web'
}

const realOS = getOSName();

export const Platform = {
    realOS,
    ..._Platform,
    isElectron: isElectron(),
    isStandalone: (window.navigator).standalone,
    selectUsingRealOS(specifics, { fallbackToWeb = false } = {}) {
    const result =
      Platform.realOS in specifics
        ? specifics[realOS]
        : fallbackToWeb && 'web' in specifics
        ? specifics.web
        : specifics.default;

    return result
  },
};
