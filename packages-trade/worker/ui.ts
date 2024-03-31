import {UISubject} from '@rx/observables/UISubject';

declare global {
  function postMessage(paramg: any): void;
}

const ui$ = new UISubject();
export const uiMsg$ = ui$.asObservable();

export function sendToUi(msg: WorkerMsg) {
  ui$.next(msg);
}
