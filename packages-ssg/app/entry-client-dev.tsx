import '@rx-ssg/account';
import '@rx-ssg/liquidity';
import '@rx-ssg/main';
import '@rx-ssg/strategy';
import {bootstrap} from '@rx/build/main';
import '@rx/helper/polyfill/EventTarget';
import '@rx/helper/polyfill/array';
import '@rx/helper/polyfill/map';
import '@rx/helper/polyfill/rxjs';
import React from 'react';
import {createRoot} from 'react-dom/client';
import 'virtual:uno.css';

bootstrap((Component: any) => {
  createRoot(document.getElementById('root') as HTMLElement).render(<Component />);
});
