interface WsMsg {
  [index: string]: any;
}

type MsgType = 'snapshot' | 'incremental';
