import { Browser } from '../browser';
import { getUrlParams, listenForNextUrl } from './helpers';

const redirectUri = 'reactuate://callback';

export async function executeOAuth(provider) {
  Browser.openAuth(provider);

  const url = await listenForNextUrl();

  const params = getUrlParams(url, redirectUri);

  if (typeof Browser.dismiss === 'function') Browser.dismiss();

  if (!(params && params.connectSid)) {
    throw new Error('Login failed: No connectSid received.')
  }

  return params;
}
