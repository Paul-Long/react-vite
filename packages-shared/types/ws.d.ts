type WsStatus =
  | 'Init'
  | 'Opening'
  | 'Opened'
  | 'Connected'
  | 'Closing'
  | 'Closed'
  | 'OpenError'
  | 'OpenTimeout'
  | 'HeartbeatTimeout'
  | 'Error';
type TyMsg = {phase: string; start: number; end: number; duration: number};
