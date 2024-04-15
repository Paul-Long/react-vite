import '@rx/helper/polyfill/EventTarget';
import '@rx/helper/polyfill/array';
import '@rx/helper/polyfill/map';
import {openWS, wsStatus$} from '@rx/ws';
import {filter} from 'rxjs/operators';
import './subscription';
import {sendToUi, uiMsg$} from './ui';

uiMsg$.pipe(filter((o) => o.type === 'foundation-data')).subscribe(({url}) => {
  openWS(url);
});

wsStatus$.subscribe((status) => {
  sendToUi({type: 'ws-status', data: {status}});
});
