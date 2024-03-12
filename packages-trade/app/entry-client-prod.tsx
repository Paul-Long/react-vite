import {bootstrap} from '@rx/build/main';
import '@rx/helper/polyfill/EventTarget';
import '@rx/helper/polyfill/array';
import '@rx/helper/polyfill/map';
import '@rx/helper/polyfill/rxjs';
import React from 'react';
import ReactDOM from 'react-dom';
import 'templates-center';
import 'virtual:uno.css';

bootstrap((Component: any) => {
  ReactDOM.render(<Component />, document.getElementById('root'));
});
