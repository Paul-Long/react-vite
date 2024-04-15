import {WebWorkerSubject} from '@rx/observables/WebWorkerSubject';
import {BehaviorSubject} from 'rxjs';
import {filter, map} from 'rxjs/operators';

const _worker$ = new WebWorkerSubject<WorkerMsg>();
export const worker$ = _worker$.asObservable();

const _wsStatus$ = new BehaviorSubject<WsStatus>('Init');
export const wsStatus$ = _wsStatus$.asObservable();
export const wsOpening$ = wsStatus$.pipe(filter((x: WsStatus) => x === 'Opening'));
export const wsOpened$ = wsStatus$.pipe(filter((x: WsStatus) => x === 'Opened'));
export const wsConnected$ = wsStatus$.pipe(filter((x: WsStatus) => x === 'Connected'));

worker$
  .pipe(
    filter((o) => o.type === 'ws-status'),
    map((o) => o.data.status)
  )
  .subscribe((status: WsStatus) => _wsStatus$.next(status));

export function initWorker(createDataWorker: () => Worker) {
  _worker$.init(createDataWorker);
}

export function sendToWorker(msg: WorkerMsg) {
  _worker$.next(msg);
}
