import qs from 'query-string';
import {history} from './history';

export const router = {
  push(pathname: string, query: Record<string, any> = {}) {
    history._action = 'PUSH';
    history.push(convertLocation(pathname, query));
  },
  replace(pathname: string, query: Record<string, any> = {}) {
    history._action = 'REPLACE';
    history.replace(convertLocation(pathname, query));
  },
  goBack(n: number = 1) {
    history._action = 'GO_BACK';
    history.go(-n);
  },
  goForward(n: number = 1) {
    history._action = 'GO_FORWARD';
    history.go(n);
  },
  goto(url: string, query: Record<string, any> = {}) {
    window.location.assign(url + convertSearch(query));
  },
  open(url: string, query: Record<string, any> = {}) {
    window.open(url + convertSearch(query));
  },
  reload() {
    window.location.reload();
  },
};

function convertLocation(pathname, query) {
  const search = convertSearch(query);
  return {pathname, search};
}

function convertSearch(query) {
  const search = qs.stringify(query);
  return search ? `?${search}` : '';
}
