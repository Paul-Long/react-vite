// Define a read-only object to simulate enums
const WSEnum = {
  dataType: {
    t_json: '1',
    t_byte: '2',
    t_gzip: '3',
  } as const, // Use `as const` to ensure the properties are read-only

  loginType: {
    login: '1', // Gateway verification
    sid: '2', // Requires a sid, typically used with HTTP login
  } as const,

  protoKey: {
    HEADER_LENGTH: 'HEADER_LENGTH',
    packetLen: 'packetLen',
    headerLen: 'headerLen',
    cmd: 'cmd', // Commands 1, 2, 3, etc.
    format: 'format', // Request/Response, Broadcast
    seq: 'seq', // Sequence number
    sessionId: 'sessionId',
    body: 'body',
  } as const,

  protoCmd: {
    CONNECT: 0,
    CLOSE: 1,
    HEARTBEAT: 2,
    SEND: 3,
  } as const,

  protoFormat: {
    REQUEST: 0,
    REPLY: 1,
    NOTIFY: 2,
    SEND: 3,
  } as const,
};

// Use `typeof` to capture the type of WSEnum
type WSEnumType = typeof WSEnum;

// Export the type and the object
export {WSEnum, WSEnumType};
export default WSEnum;
