import { Linking } from '../linking';
import { Platform } from '../platform/index.web';
import { getUrlParams, listenForNextMessageData, listenForNextUrl } from './helpers'

const schemaRedirectUri = Platform.isElectron
  ? 'reactuate://callback'
  : undefined;

function getPopupTarget() {
  return !__DEV__ &&
    (Platform.realOS !== 'web' ||
      query.installation_id ||
      Platform.isStandalone ||
      (navigator.userAgent || '').includes('Edge'))
    ? '_self'
    : '_blank';
}

function popupWindow(uri, w = 500, h = 600) {
  const left = (window.screen.width - w) / 2;
  const top = (window.screen.height - h) / 2;

  return window.open(
    uri,
    getPopupTarget(),
    `resizable=yes, width=${w}, height=${h}, top=${top}, left=${left}`,
  )
}

export async function executeOAuth(provider) {
  const redirectUrl = schemaRedirectUri || (Platform.OS === 'web' && getPopupTarget() === '_self' && window.location.origin);

  // TODO: This needs to be improved
  const popup = popupWindow(`http://192.168.0.18:5678/auth/${provider}/callback?redirect_uri=http://192.168.0.18:5678/callback/`);

  try {
    let params;

    if (schemaRedirectUri && (await Linking.canOpenURL(schemaRedirectUri))) {
      const uri = await listenForNextUrl();
      params = getUrlParams(uri, schemaRedirectUri);
    } else {
      params = await listenForNextMessageData(popup);
    }

    if (!(params)) {
      throw new Error('Login failed: No session id received.');
    }

    return params
  } catch (e) {
    if (popup && popup !== window) popup.close();

    throw e
  }
}
