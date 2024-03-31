import {bootstrap} from '@rx/build/main';
import '@rx/helper/polyfill/EventTarget';
import '@rx/helper/polyfill/array';
import '@rx/helper/polyfill/map';
import '@rx/helper/polyfill/rxjs';
import {initWorker} from '@rx/streams/worker';
import DataWorker from '@trade/worker/index?worker';
import ReactDOM from 'react-dom';
import 'templates-center';
import 'virtual:uno.css';

initWorker(() => new DataWorker());
bootstrap((Component: any) => {
  ReactDOM.render(<Component />, document.getElementById('root'));
}).then();
