import { Linking } from '../linking';

export const getUrlParams = (url, prefix,) => {
  if (!url || typeof url !== 'string') return null;

  if (url.startsWith(prefix)) {
    const ConnectSid = url.split('?')[1];
    return { connectSid: ConnectSid };
  }

  return null;
};

export const listenForNextUrl = () => {
  return new Promise((resolve, reject) => {
    const handleUrl = (e) => {
      Linking.removeEventListener('url', handleUrl);
      const url = (e && e.url) || '';

      return url ? resolve(url) : reject(new Error('No URL received'));
    };

    Linking.addEventListener('url', handleUrl);
  })
};

export const listenForNextMessageData = (popup) => {
  let finished = false;

  return new Promise ((resolve, reject) => {

    const handleMessage = (e) => {
      // Can be messages from other places, e.g. from the redux devtools
      // So we make sure that we accept only the data of the string type [url with callback session id]
      // and also check that the url address matches the origin (our server)

      if (!(e && e.data && typeof e.data === 'string' && e.data.includes(e.origin))) {
        return
      }

      const params = getUrlParams(e.data, e.origin);

      window.removeEventListener('message', handleMessage);

      if (params.connectSid) {
        resolve(params);
      } else {
        reject(new Error('No session id received'));
      }

      finished = true;
    };

    window.addEventListener('message', handleMessage, false);

    setTimeout(() => {
      if (finished) return;

      finished = true;
      window.removeEventListener('message', handleMessage);
      reject(new Error('Timeout'))
    }, 120 * 1000);

    if (popup) {
      const onClosePopup = async () => {
        // the close may be detected before the postMessage
        if (!(popup.closed && !finished)) return;

        finished = true;
        window.removeEventListener('message', handleMessage);
        reject(new Error('Canceled or unable to receive message from server'));
      };

      // reliable cross-browser way to check if popup was closed
      const timer = setInterval(() => {
        if (popup.closed) {
          onClosePopup();
          clearInterval(timer)
        } else if (finished) {
          clearInterval(timer)
        }
      }, 500)
    }
  })
};
