import {sendToWs, wsMsg$} from '@rx/ws';
import {genRequest} from '@rx/ws/utils/proto-utils';
import {Subject, type Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {uiMsg$} from '../ui';

interface Options {
  toJson?: boolean;
  Types: Record<string, any>;
  matchTopic?: (t1: string, t2: string) => boolean;
}

export class TopicSubject extends Subject<any> {
  _toJson: boolean;
  _topic?: string;
  _serverName?: string;
  _send?: Subscription;
  _receive?: Subscription;
  _matchTopic?: (t1: string, t2: string) => boolean;
  Types: Record<any, any>;

  constructor(opts: Options) {
    super();
    this.Types = opts.Types;
    this._toJson = opts.toJson ?? true;
    this._matchTopic = opts.matchTopic;
    this.init();
  }

  private send(data: WsMsg) {
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
  }

  init() {
    this._send = uiMsg$.pipe(filter((o) => o.type === this.Types.Subscribe)).subscribe((o) => {
      this._topic = o.topic;
      this._serverName = o.serverName;
      console.log('subscribe : ', o.serverName, o.topic);
      sendToWs(genRequest(o.serverName, 'subscribe', o.topic));
    });
    this._receive = wsMsg$
      .pipe(
        map((o) => o.dataObject?.body),
        filter(Boolean),
        filter((o) => {
          if (this._matchTopic && this._topic && this._matchTopic(this._topic, o?.topic)) {
            return true;
          }
          return o?.topic === this._topic;
        })
      )
      .subscribe((o) => {
        const {topic, content} = o;
        try {
          this.send({
            type: this.Types.Subscribe,
            data: {topic, content: this._toJson ? JSON.parse(content) : content},
          });
        } catch (e) {}
      });
  }
}
