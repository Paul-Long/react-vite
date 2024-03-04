import {createBrowserHistory} from 'history';
import {env} from '@rx/env';

declare module 'history' {
  interface BrowserHistory {
    _action: string;
  }
  interface Update {
    key: string;
  }
}

export const history = env.isBrowser ? createBrowserHistory() : null;
