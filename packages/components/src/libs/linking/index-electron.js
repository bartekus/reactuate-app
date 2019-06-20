// Source: https://github.com/PaulLeCam/react-native-electron/blob/master/src/apis/Linking.js

import { Linking as LinkingOriginal } from './index-native';

const eventHandlers = new Map();

export const Linking = {
  addEventListener: (type, handler) => {
    if (!(type === 'url' && typeof handler === 'function')) return;

    const wrapHandler = (_e, url) => {
      if (typeof (url || '') !== 'string') {
        if (__DEV__) console.error('[Linking] URL not a string', url);
        return
      }

      handler({ type, url: url || '' })
    };

    eventHandlers.set(handler, wrapHandler);
    window.ipc.addListener('open-url', wrapHandler)
  },
  async canOpenURL(url) {
    return window.ipc.sendSync('can-open-url', url)
  },
  clearCurrentURL() {
    //
  },

  getCurrentURL() {
    return typeof window.location.href === 'string'
      ? window.location.href || ''
      : ''
  },

  getInitialURL() {
    return LinkingOriginal.getInitialURL()
  },

  openURL: (url) => {
    return LinkingOriginal.openURL(url)
  },

  removeEventListener: (type, handler) => {
    if (!(type === 'url' && typeof handler === 'function')) return;

    const wrapHandler = eventHandlers.get(handler);
    if (wrapHandler) {
      window.ipc.removeListener('open-url', wrapHandler)
    }

    eventHandlers.delete(handler)
  },
};
