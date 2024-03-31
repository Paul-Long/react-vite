import {WebWorkerSubject} from '@rx/observables/WebWorkerSubject';

const _worker$ = new WebWorkerSubject();
export const worker$ = _worker$.asObservable();

export function initWorker(createDataWorker: () => Worker) {
  _worker$.init(createDataWorker);
}

export function sendToWorker(msg: WorkerMsg) {
  _worker$.next(msg);
}
