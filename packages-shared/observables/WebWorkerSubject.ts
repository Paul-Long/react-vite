import {Subject} from 'rxjs';

declare global {
  interface Window {
    createDataWorker(): Worker;
  }
  interface Worker {
    subscribe(event: string, callback: Function): Worker;
  }
}

export class WebWorkerSubject<T> extends Subject<T> {
  worker: Worker;

  init(createDataWorker: () => Worker) {
    this.worker = createDataWorker();
    this.worker.subscribe('message', ({data}) => {
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
  next(message: T) {
    this.worker && this.worker.postMessage(message);
  }
}
