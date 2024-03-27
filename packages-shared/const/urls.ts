import {env} from '@rx/env';

// export const API_PREFIX = genApiUrl();
// export const API_URL = `${API_PREFIX}/httpapi`;
export const API_URL = `http://3.1.146.145:3002`;
// export const WS_URL = genWsUrl();

function genApiUrl() {
  const hostname = calcHostname();
  const separator = calcSeparator(hostname);
  return ['https://api100', hostname].join(separator);
}

function genWsUrl() {
  const hostname = calcHostname();
  const separator = calcSeparator(hostname);
  return ['wss://ws100', hostname].join(separator);
}

function calcHostname() {
  if (env.isServer) {
    return 'rubydex.com';
  }
  const hostname = env.isLocal ? import.meta.env.VITE_DEV_HOST : location.hostname;
  // sample: dev11 -> dev1, dev12 -> dev1
  if (/^[a-z]*[0-9]{2}\./i.test(hostname)) {
    return hostname
      .split('.')
      .map((o: any, i: any) => (i === 0 ? o.slice(0, -1) : o))
      .join('.');
  }
  return hostname;
}

function calcSeparator(hostname: string) {
  const parts = hostname.split('.');
  return parts.length === 2 ? '.' : '-';
}
