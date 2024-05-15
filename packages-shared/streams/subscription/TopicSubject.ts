import {sendToWorker, worker$, wsConnected$} from '@/worker';
import {BehaviorSubject, Subject, Subscription, filter, switchMap, takeUntil} from 'rxjs';
import {map} from 'rxjs/operators';

interface Options {
  serverName: string;
  Types: Record<string, any>;
  initValue?: any;
  formatter?: (o: any) => any;
  matchTopic?: (t1: string, t2: string) => boolean;
}

export class TopicSubject extends BehaviorSubject<any> {
  _topic: string;
  _serverName: string;
  _subscription: Subscription;
  _formatter?: (o: any) => any;
  _matchTopic?: (t1: string, t2: string) => boolean;
  Types: Record<string, any>;
  private readonly _unsubscribe$ = new Subject<void>();

  constructor(opts: Options) {
    super(opts.initValue);
    this._serverName = opts.serverName;
    this._formatter = opts.formatter;
    this._matchTopic = opts.matchTopic;
    this.Types = opts.Types;
  }

  clear() {
    super.next(null);
  }

  next(topic: string) {
    if (topic === this._topic) {
      return;
    }

    this._topic = topic;

    this._unsubscribe$.next();

    wsConnected$
      .pipe(
        filter((status) => status === 'Connected'),
        takeUntil(this._unsubscribe$), // 当 _unsubscribe$ 发出时取消订阅
        switchMap(() => {
          sendToWorker({type: this.Types.Subscribe, serverName: this._serverName, topic});
          return worker$.pipe(
            filter((o) => {
              if (
                this._matchTopic &&
                o.type === this.Types.Subscribe &&
                this._matchTopic(topic, o?.data?.topic)
              ) {
                return true;
              }
              return o.type === this.Types.Subscribe && o?.data?.topic === topic;
            }),
            map((o) => o.data?.content),
            filter(Boolean),
            map((o) => (this._formatter ? this._formatter(o) : o))
          );
        }),
        takeUntil(this._unsubscribe$)
      )
      .subscribe((data) => {
        this.send(data);
      });
  }

  private send(data) {
    super.next(data);
  }

  unsubscribe() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
    super.unsubscribe();
  }
}
