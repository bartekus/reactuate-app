import { Linking as LinkingOriginal } from 'react-native';

import { Platform } from '../platform';

let currentURL = '';
let initialURL = '';

LinkingOriginal.getInitialURL().then(url => {
  if (typeof (url || '') !== 'string') {
    if (__DEV__) console.error('[Linking.getInitialURL] URL not a string', url);
    return
  }

  initialURL = url || '';
});

LinkingOriginal.addEventListener('url', e => {
  if (!(e && typeof (e.url || '') === 'string')) {
    if (__DEV__)
      console.error('[Linking.addEventListener] e.url not a string', e.url);
    return
  }

  currentURL = e.url || '';
});

export const Linking = {
  addEventListener: LinkingOriginal.addEventListener.bind(LinkingOriginal),
  canOpenURL: LinkingOriginal.canOpenURL.bind(LinkingOriginal),
  clearCurrentURL: () => { currentURL = ''; },
  getCurrentURL: Platform.OS === 'web' ? () => window.location.href || '' : () => currentURL,
  getInitialURL: () => initialURL,
  openURL: LinkingOriginal.openURL.bind(LinkingOriginal),
  removeEventListener: LinkingOriginal.removeEventListener.bind(LinkingOriginal),
};
