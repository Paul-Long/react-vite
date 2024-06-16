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
  if (env.isServer) {
    return 'rate-x.io';
  }
  const hostname = env.isLocal ? import.meta.env.VITE_DEV_HOST : location ? location.hostname : '';
  return (
    'https://api' +
    ['dev10', 'dev11', 'dev12', 'testnet']
      .find((pre) => hostname.indexOf(pre) > -1)
      ?.replace(/\D/g, '')
  );
}

function getWsPrefix() {
  if (env.isServer) {
    return 'rate-x.io';
  }
  const hostname = env.isLocal ? import.meta.env.VITE_DEV_HOST : location ? location.hostname : '';
  return (
    'wss://ws' +
    ['dev10', 'dev11', 'dev12', 'testnet']
      .find((pre) => hostname.indexOf(pre) > -1)
      ?.replace(/\D/g, '')
  );
}

function calcHostname() {
  if (env.isServer) {
    return 'rate-x.io';
  }
  // const hostname = env.isLocal ? import.meta.env.VITE_DEV_HOST : location.hostname;
  const hostname = env.isLocal ? import.meta.env.VITE_DEV_HOST : location ? location.hostname : '';
  // sample: dev11 -> dev1, dev12 -> dev1
  if (hostname.startsWith('app-testnet')) {
    return 'testnet.rate-x.io';
  }
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
