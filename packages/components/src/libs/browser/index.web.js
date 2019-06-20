import { Linking } from '../linking'

export const Browser = {
    addListener: (e, handler) => {
      if (e === 'url') {
        Linking.addEventListener(e, handler);
        return { remove: () => Linking.removeEventListener(e, handler) }
      }

      console.debug('[BROWSER] Ignoring addEventListener event', e); // tslint:disable-line no-console
      return null
    },
    dismiss: () => undefined,
    openURL: Linking.openURL,
};

Browser._validateURL = Linking._validateURL;
