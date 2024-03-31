import {bootstrap} from '@rx/build/main';
import '@rx/helper/polyfill/EventTarget';
import '@rx/helper/polyfill/array';
import '@rx/helper/polyfill/map';
import '@rx/helper/polyfill/rxjs';
import {initWorker} from '@rx/streams/worker';
import '@trade/account';
import '@trade/lp';
import '@trade/market';
import '@trade/strategies';
import '@trade/trade';
import DataWorker from '@trade/worker/index?worker';
import {createRoot} from 'react-dom/client';
import 'virtual:uno.css';

initWorker(() => new DataWorker());
bootstrap((Component: any) => {
  createRoot(document.getElementById('root') as HTMLElement).render(<Component />);
}).then();
