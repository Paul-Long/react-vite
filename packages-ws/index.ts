import {guid} from '@rx/helper/guid';
import {ReplaySubject, Subject, merge} from 'rxjs';
import {delay, mapTo, retryWhen} from 'rxjs/operators';
import {WebsocketConfig, WebsocketSubject} from './observables/WebsocketSubject';
import {ty$} from './streams/tingyun';
import {genConnect} from './utils/proto-utils';

const wsUrl$ = new ReplaySubject<string>();
export const delay$ = new Subject<number>();

const wsOpening$ = new Subject<void>();
export const wsOpened$ = new Subject<void>();
const wsClosing$ = new Subject<void>();
const wsClosed$ = new Subject<void>();
const wsConnected$ = new Subject<void>();

export const wsStatus$ = merge<WsStatus[]>(
  wsOpening$.pipe(mapTo('Opening')),
  wsOpened$.pipe(mapTo('Opened')),
  wsConnected$.pipe(mapTo('Connected')),
  wsClosing$.pipe(mapTo('Closing')),
  wsClosed$.pipe(mapTo('Closed'))
);

const config: WebsocketConfig = {
  WebSocketCtor: WebSocket,
  urlObservable: wsUrl$,
  openingObserver: wsOpening$,
  openedObserver: wsOpened$,
  connectedObserver: wsConnected$,
  closingObserver: wsClosing$,
  closedObserver: wsClosed$,
  delayObserver: delay$,
  tyObserver: ty$,
};

const ws$ = new WebsocketSubject(config);
export {ws$ as toWsMsg$};

export const wsMsg$ = ws$.pipe(retryWhen((errors) => errors.pipe(delay(2000))));

wsMsg$.subscribe();

wsStatus$.subscribe((status) => {
  if (status === 'Opened') {
    ws$.next(genConnect(guid.build(), {serverName: 'gateway'}));
  }
  console.log('Websocket Status : ', status);
});

export function openWS(url: string) {
  wsUrl$.next(url);
}

export function sendToWs(msg: WsMsg) {
  ws$.next(msg);
}
