import {EMPTY, Observable, ReplaySubject, Subject, Subscriber, Subscription} from 'rxjs';
import {filter, take, throttleTime} from 'rxjs/operators';
import {byteToProto, genHeartbeat, requestByte} from '../utils/proto-utils';
import WSEnum from '../utils/ws-const';
import {AnonymousSubject} from './AnonymousSubject';

const {protoCmd} = WSEnum;

type Msg = WsMsg;

interface WebSocketType extends WebSocket {
  sid?: number;
  guid?: number;
}

interface WebSocketCtor {
  new (url: string, protocol: string);
  new (url: string);
}

export interface WebsocketConfig {
  url?: string;
  urlObservable?: Observable<string>;
  protocol?: string;
  binaryType?: BinaryType;
  pingPongInterval?: number;
  pingPongTimeout?: number;
  WebSocketCtor?: WebSocketCtor;
  serializer?: (value) => string;
  deserializer?: (e) => object;

  openingObserver?: Subject<void>;
  openedObserver?: Subject<void>;
  connectedObserver?: Subject<void>;
  closingObserver?: Subject<void>;
  closedObserver?: Subject<void>;
  delayObserver?: Subject<number>;
  pingPongTimeoutObserver?: Subject<void>;
  tyObserver?: Subject<TyMsg>;
}

const DEFAULT_WEBSOCKET_CONFIG = {
  url: '',
  pingPongInterval: 3000,
  pingPongTimeout: 10000,
  deserializer: (e) => byteToProto(e.data),
  serializer: (value) => requestByte(value),
};

const WEBSOCKETSUBJECT_INVALID_ERROR_OBJECT =
  'WebsocketSubject.error must be called with an object with an error code, and an optional reason: { code: number, reason: string }';

export class WebsocketSubject extends AnonymousSubject<Msg> {
  idCounter: number = 1;
  url: string = null;
  isReset = true;
  _socket: WebSocketType | null = null;
  _config: WebsocketConfig;
  _output: Subject<Msg>;
  source: Observable<Msg>;
  _heartbeatSuccessObserver: Subject<TyMsg>;
  destination: ReplaySubject<Msg> | Subscriber<Msg>;

  constructor(config: WebsocketConfig) {
    super();

    this.idCounter = 1;
    this.url = null;
    this.isReset = true;
    this._socket = null;
    this._config = Object.assign({}, DEFAULT_WEBSOCKET_CONFIG, config);
    this._output = new Subject<Msg>();
    this._heartbeatSuccessObserver = new Subject<TyMsg>();
    this._heartbeatSuccessObserver
      .pipe(throttleTime(10000))
      .subscribe((msg: TyMsg) => config.tyObserver.next(msg));
    this.destination = new ReplaySubject<Msg>();
  }

  _resetState() {
    this.idCounter = 1;
    this.isReset = true;
    this._socket = null;
    if (!this.source) {
      this.destination = new ReplaySubject<Msg>();
    }
    this._output = new Subject<Msg>();
  }

  send(message) {
    const {_socket} = this;
    if (!_socket || _socket.readyState !== 1) {
      return EMPTY;
    }

    const id = this.idCounter++;
    this.next({...message, id});
    return this._output.pipe(
      filter((o) => o.id === id),
      take(1)
    );
  }

  _connectSocket(url) {
    const {WebSocketCtor, openingObserver, connectedObserver, tyObserver, protocol, binaryType} =
      this._config;
    if (openingObserver) {
      openingObserver.next();
    }
    const observer = this._output;
    let socket: WebSocketType | null = null;
    const wsCreateTime = Date.now();
    try {
      socket = protocol ? new WebSocketCtor(url, protocol) : new WebSocketCtor(url);
      socket.guid = Math.floor(Math.random() * 10000);
      socket.binaryType = 'arraybuffer';
      this._socket = socket;
      if (binaryType) {
        this._socket.binaryType = binaryType;
      }
    } catch (e) {
      tyObserver.next(createTyMsg('ws_open_fail', wsCreateTime));
      observer.error(e);
      return;
    }

    const subscription = new Subscription(() => {
      this._socket = null;
      if (socket && socket.readyState === 1) {
        socket.close();
      }
    });

    socket.onopen = (e: Event) => {
      tyObserver.next(createTyMsg('ws_open_success', wsCreateTime));
      const {_socket} = this;
      if (!_socket) {
        socket!.close();
        this._resetState();
        return;
      }

      const {openedObserver} = this._config;
      if (openedObserver) {
        openedObserver.next();
      }

      const queue = this.destination;
      this.destination = new Subscriber({
        next: (x: any) => {
          if (socket.readyState === 1) {
            try {
              const {serializer} = this._config;
              if (socket.sid) {
                x.sessionId = socket.sid ?? '=';
              }
              // console.log('Send Message : ', x);
              socket.send(serializer(x));
            } catch (e) {
              this.destination.error(e);
            }
          }
        },
        error: (err: any) => {
          const {closingObserver} = this._config;
          if (closingObserver) {
            closingObserver.next(undefined);
          }
          if (err && err.code) {
            socket.close(err.code, err.reason);
          } else {
            observer.error(new TypeError(WEBSOCKETSUBJECT_INVALID_ERROR_OBJECT));
          }
          this._resetState();
        },
        complete: () => {
          const {closingObserver} = this._config;
          if (closingObserver) {
            closingObserver.next(undefined);
          }
          socket.close();
          this._resetState();
        },
      });
      if (queue && queue instanceof ReplaySubject) {
        subscription.add(queue.subscribe(this.destination));
      }
    };
    socket.onerror = (e: Event) => {
      const target = e.currentTarget as WebSocketType;
      tyObserver.next(createTyMsg('ws_error', wsCreateTime));
      if (this?._socket?.readyState < 2 && this?._socket?.guid !== target?.guid) {
        return;
      }
      this._resetState();
      observer.error(e);
    };
    socket.onclose = (e: CloseEvent) => {
      const target = e.currentTarget as WebSocketType;
      tyObserver.next(createTyMsg('ws_close', wsCreateTime));
      if (this?._socket?.readyState < 2 && this?._socket?.guid !== target?.guid) {
        return;
      }
      this._resetState();
      const {closedObserver} = this._config;
      if (closedObserver) {
        closedObserver.next();
      }
      observer.error(e);
    };
    socket.onmessage = (e: MessageEvent) => {
      try {
        const target = e.currentTarget as WebSocketType;
        if (this?._socket?.readyState < 2 && this?._socket?.guid !== target?.guid) {
          return;
        }
        const {deserializer} = this._config;
        const dataObject: any = deserializer(e);
        if (dataObject.sid) {
          socket.sid = dataObject.sid;
        }
        if (dataObject.cmd === protoCmd.CONNECT) {
          connectedObserver.next();
          this._startPingPong();
        }
        e['dataObject'] = dataObject;
        // console.log('OnMessage : ', dataObject);
        observer.next(e);
      } catch (err) {
        observer.error(err);
      }
    };
  }

  _startPingPong() {
    const {_socket} = this;
    if (!_socket || _socket.readyState !== 1) {
      return;
    }

    const wsPingTime = Date.now();
    const timeout = setTimeout(() => {
      const {pingPongTimeoutObserver, tyObserver} = this._config;
      if (pingPongTimeoutObserver) {
        pingPongTimeoutObserver.next();
      }
      if (_socket && _socket.readyState < 2) {
        _socket.close();
      }
      tyObserver.next(createTyMsg('ws_heartbeat_timeout', wsPingTime));
    }, this._config.pingPongTimeout);

    const {_output} = this;
    _output.pipe(take(1)).subscribe(() => {
      clearTimeout(timeout);
    });

    _output
      .pipe(
        filter((o) => o['dataObject'].cmd === protoCmd.HEARTBEAT),
        take(1)
      )
      .subscribe(() => {
        const {delayObserver, pingPongInterval} = this._config;
        if (delayObserver) {
          delayObserver.next(Date.now() - wsPingTime);
        }
        this._heartbeatSuccessObserver.next(createTyMsg('ws_heartbeat_success', wsPingTime));
        setTimeout(() => this._startPingPong(), pingPongInterval);
      });
    this.next(genHeartbeat(''));
  }

  protected _subscribe(subscriber: Subscriber<Msg>) {
    const {source} = this;
    if (source) {
      return source.subscribe(subscriber);
    }

    if (this.isReset) {
      this.isReset = false;
      const {_config} = this;
      const {urlObservable} = _config;
      const url = this.url || _config.url;
      if (url) {
        this._connectSocket(url);
      } else if (urlObservable) {
        urlObservable.pipe(take(1)).subscribe((url: string) => {
          this.url = url;
          this._connectSocket(url);
        });
      }
    }
    this._output.subscribe(subscriber);
    subscriber.add(() => {
      const {_socket} = this;
      if (this._output.observers.length === 0) {
        if (_socket && (_socket.readyState === 1 || _socket.readyState === 0)) {
          _socket.close();
        }
        this._resetState();
      }
    });
    return subscriber;
  }

  unsubscribe() {
    const {_socket} = this;
    if (_socket && _socket.readyState === 1) {
      _socket.close();
    }
    this._resetState();
    super.unsubscribe();
  }
}

function createTyMsg(phase: string, start: number) {
  const end = Date.now();
  return {phase, start, end, duration: end - start};
}
