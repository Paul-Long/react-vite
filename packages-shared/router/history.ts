import {env} from '@rx/env';
// @ts-ignore
import {createBrowserHistory} from 'history';

declare module 'history' {
  interface BrowserHistory {
    _action: string;
  }
  interface Update {
    key: string;
  }
}

export const history = env.isBrowser ? createBrowserHistory() : null;
