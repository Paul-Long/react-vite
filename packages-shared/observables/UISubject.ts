import {Subject} from 'rxjs';

declare global {
  function postMessage(any): void;
}

export class UISubject extends Subject<WorkerMsg> {
  constructor() {
    super();
    addEventListener('message', ({data}) => {
      if (this.closed) {
        throw new Error();
      }
      if (!this.isStopped) {
        const {observers} = this;
        const len = observers.length;
        const copy = observers.slice();
        for (let i = 0; i < len; i++) {
          copy[i].next(data);
        }
      }
    });
  }

  next(message: WorkerMsg) {
    postMessage(message);
  }
}
