import { EventEmitter } from 'fbemitter';
import InAppBrowser from 'react-native-inappbrowser-reborn';

import { Linking, getDeepLink } from '../linking';

const emitter = new EventEmitter();

export const Browser = {
  addListener: (e, handler) => {
    if (e === 'url') {
      Linking.addEventListener(e, handler);
      return { remove: () => Linking.removeEventListener(e, handler) }
    }

    if (e === 'onShow' || e === 'onDismiss') {
      return emitter.addListener(e, handler);
    }

    console.debug('[BROWSER] Unknown addListener event', e); // tslint:disable-line no-console
    return null
  },
  dismiss: InAppBrowser.close,

  openAuth: async (provider) => {
    const deepLink = getDeepLink("callback");
    const url = `http://192.168.0.18:5678/auth/${provider}?redirect_uri=${deepLink}`;

    try {
      if (await InAppBrowser.isAvailable()) {
        emitter.emit('onShow');

        InAppBrowser.openAuth(url, deepLink, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          // Android Properties
          showTitle: false,
          enableUrlBarHiding: true,
          enableDefaultShare: true,

          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right'
          },
        }).then((response) => {
          // Alert.alert(JSON.stringify(response));
          if (response.type === 'success' && response.url) {
            Linking.openURL(response.url)
          }
        });

        // Alert.alert(JSON.stringify(result));
        emitter.emit('onDismiss')
      }
      else {
        Linking.openURL(url)
      }
    } catch (error) {
      console.error(error.message)
    }
  },
};

Linking.addEventListener('url', ({ url }) => {
  if (url && url.startsWith('reactuate://')) {
    InAppBrowser.close()
  }
});
