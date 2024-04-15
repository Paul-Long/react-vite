import {Observable, Observer, Subject, Subscriber, Subscription} from 'rxjs';

/**
 * @class AnonymousSubject<T>
 */
export class AnonymousSubject<T> extends Subject<T> {
  constructor(
    /** @deprecated Internal implementation detail, do not use directly. Will be made internal in v8. */
    public destination?: Observer<T>,
    source?: Observable<T>
  ) {
    super();
    this.source = source;
  }

  next(value: T) {
    this.destination?.next?.(value);
  }

  error(err: any) {
    this.destination?.error?.(err);
  }

  complete() {
    this.destination?.complete?.();
  }

  /** @internal */
  protected _subscribe(subscriber: Subscriber<T>): Subscription {
    return this.source?.subscribe(subscriber) ?? Subscription.EMPTY;
  }
}
