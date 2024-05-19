import {env} from '@rx/env';

export const API_PREFIX = genApiUrl();
export const API_URL = `${API_PREFIX}`;
export const WS_URL = `${genWsUrl()}/gateway`;

function genApiUrl() {
  const hostname = calcHostname();
  const separator = calcSeparator(hostname);
  return [getApiPrefix(), hostname].join(separator);
}

function genWsUrl() {
  const hostname = calcHostname();
  const separator = calcSeparator(hostname);
  return [getWsPrefix(), hostname].join(separator);
}

function getApiPrefix() {
  const hostname = env.isLocal ? import.meta.env.VITE_DEV_HOST : location.hostname;
  if (hostname.startsWith('app-dev11')) {
    return 'https://api11';
  }
  return 'https://api10';
}

function getWsPrefix() {
  const hostname = env.isLocal ? import.meta.env.VITE_DEV_HOST : location.hostname;
  if (hostname.startsWith('app-dev11')) {
    return 'wss://ws11';
  }
  return 'wss://ws10';
}

function calcHostname() {
  if (env.isServer) {
    return 'rate-x.io';
  }
  // const hostname = env.isLocal ? import.meta.env.VITE_DEV_HOST : location.hostname;
  const hostname = env.isLocal ? import.meta.env.VITE_DEV_HOST : location.hostname;
  // sample: dev11 -> dev1, dev12 -> dev1
  if (/^(?:[a-z]*-)?[a-z]*[0-9]{2}\./i.test(hostname)) {
    return hostname
      .split('.')
      .map((o: any, i: any) => {
        if (i === 0) {
          const ps = o.split('-');
          return ps[ps.length - 1].slice(0, -1);
        }
        return o;
      })
      .join('.');
  }
  return hostname;
}

function calcSeparator(hostname: string) {
  const parts = hostname.split('.');
  return parts.length === 2 ? '.' : '-';
}
