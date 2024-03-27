import {generateConnect, generateRequest, generateSeqRequest, getSeq} from './utils/proto-utils';
import {matchTopic} from './utils/topic-utils';
import WSEnum from './utils/ws-const';
import {WSCreate, WSManager} from './websocket-manager';

const {protoFormat, protoCmd, dataType, loginType} = WSEnum;

// A map to store data to be sent
let sendDataMap: Record<string, any[]> = {};

// Name used for resetting login initialization
const resetName = 'reset-login-init';

// Function to send data through the WebSocket connection
const send = (url: string, data: any): void => {
  if (WSManager(url).isConnectStatus()) {
    WSManager(url).send(data);
  } else {
    // Code for handling reconnection and resending of data can be uncommented if needed
  }
};

/**
 * Subscription sending does not need to add re-sending
 * @param url - The WebSocket URL
 * @param data - The data to send
 */
const subSend = (url: string, data: any): void => {
  if (WSManager(url).isConnectStatus()) {
    WSManager(url).send(data);
  }
};

// The main API for interacting with the WebSocket
export const WSApi = (url: string) => {
  return {
    newAPI: (options: any) => {
      newAPI(url, options);
    },
    login: (data: any, onMessage?: (event: any, thisWebSocket: any) => void) => {
      loginManager(url, data, onMessage);
    },
    start: (options: any) => {
      newAPI(url, options);
      loginManager(url, null as any, null as any);
    },
    close: () => {
      WSManager(url).close();
    },
    send: (options: any) => {
      options.url = url;
      send(url, options);
    },
    subscribe: (subData: any, onMessage: (event: any, thisWebSocket: any) => void) => {
      WSManager(url).addEventListener({
        type: 'message',
        name: subData.name,
        topic: subData.topic,
        subscribe: true,
        sendData: subData,
        filter: (event: any, thisWebSocket: any, options: any) => {
          const msg = event.dataObject;
          if (msg && msg.format == protoFormat.NOTIFY) {
            if (options && options.topic) {
              if (msg.body && msg.body.topic) {
                if (matchTopic(msg.body.topic, options.topic)) {
                  return true;
                }
              }
            }
          }
          return false;
        },
        onMessage: onMessage,
      });
      subGenerateRequest(url, subData);
    },
    unsubscribe: (unbData: any) => {
      const selectWebSocket = WSManager(url).selectWebSocket();
      WSManager(url).removeEventListener(unbData.name);
      if (unbData.topic) {
        if (unbData.serverName) {
          unbData.sendData = generateRequest(
            selectWebSocket.sid,
            unbData.serverName,
            'unsubscribe',
            unbData.topic,
            selectWebSocket.dataType
          );
        } else {
          unbData.sendData = generateRequest(
            selectWebSocket.sid,
            'gateway',
            'unsubscribe',
            unbData.topic,
            selectWebSocket.dataType
          );
        }
      }
      send(url, unbData.sendData);
    },
    request: (reqData: any, onMessage: (event: any, thisWebSocket: any) => void) => {
      const seq = getSeq();
      reqData.seq = seq;
      WSManager(url).addEventListener({
        type: 'message',
        name: seq,
        requestEnabled: true,
        reqData: reqData,
        filter: (event: any, thisWebSocket: any, options: any) => {
          const msg = event.dataObject;
          if (msg && (msg.format === protoFormat.REPLY || msg.cmd === protoCmd.CONNECT)) {
            if (msg.seq == options.name) {
              WSManager(url).removeEventListener(options.name);
              return true;
            }
          }
          return false;
        },
        onMessage: onMessage,
      });
      requestGenerateSeqRequest(url, reqData);
    },
  };
};

interface NewAPIOptions {
  reconnect?: number;
  reconnectDelay?: number;
  dataType?: string;
  loginType?: string;
  sid?: string;
}

const newAPI = (url: string, options: NewAPIOptions): void => {
  const op = {
    url: url,
    reconnect: options.reconnect ?? -1, // default to -1 if not provided
    reconnectDelay: options.reconnectDelay ?? 30, // default to 30 seconds
    dataType: options.dataType ?? dataType.t_byte, // default to t_byte
    loginType: options.loginType ?? loginType.login, // default to login
    sid: options.sid ?? '', // default to empty string
  };

  if (!WSManager(url).createdStatus()) {
    WSCreate(op);
  }

  WSManager(url).start();

  if (op.loginType === loginType.sid && !op.sid) {
    console.error('sid is null');
  } else {
    WSManager(url).addSid(op.sid);
  }
};
interface SubData {
  topic: string;
  serverName?: string;
  sendData?: string; // Assuming sendData is a string, adjust if it's a different type
}

interface ReqData {
  serverName?: string;
  method: string;
  data: any; // Replace 'any' with a more specific type if possible
  seq: number;
}

// Assuming WSManager returns an instance with a selectWebSocket method that returns an object with sid and dataType properties
interface WebSocketManager {
  sid: string;
  dataType: string;
}

const subGenerateRequest = (url: string, subData: SubData): void => {
  const selectWebSocket: WebSocketManager = WSManager(url).selectWebSocket();
  if (subData.topic) {
    subData.sendData = generateRequest(
      selectWebSocket.sid,
      subData.serverName || 'gateway',
      'subscribe',
      subData.topic as any,
      selectWebSocket.dataType
    ) as any;
  }
  subSend(url, subData.sendData);
};

const requestGenerateSeqRequest = (url: string, reqData: ReqData): void => {
  const selectWebSocket: WebSocketManager = WSManager(url).selectWebSocket();
  const content: string = JSON.stringify(reqData.data);
  const data: any[] = generateSeqRequest(
    // Replace 'any[]' with the actual type returned
    selectWebSocket.sid,
    reqData.serverName || 'gateway',
    reqData.method,
    content as any,
    reqData.seq,
    selectWebSocket.dataType
  ) as any;
  send(url, data);
};

const loginManager = (url: string, data: any, onMessage?: OnMessageCallback): void => {
  const wsManager = WSManager(url); // Assuming WSManager returns an instance with these methods
  if (wsManager.readyState() === WebSocket.OPEN) {
    const thisWebSocket = wsManager.selectWebSocket();
    if (thisWebSocket.loginType === loginType.login) {
      thisWebSocket.logData = data;
      sendLoginDate(url, data, onMessage);
    } else if (thisWebSocket.loginType === loginType.sid) {
      resetSendInfo(url, thisWebSocket);
      resConnect(url);
    }
  } else {
    const loginInt = 'login-init';
    wsManager.addEventListener({
      name: loginInt,
      type: 'open',
      onMessage: (event: Event): void => {
        const thisWebSocket = wsManager.selectWebSocket();
        if (thisWebSocket.loginType === loginType.login) {
          thisWebSocket.logData = data;
          sendLoginDate(url, data, onMessage);
        } else if (thisWebSocket.loginType === loginType.sid) {
          resetSendInfo(url, thisWebSocket);
          resConnect(url);
        }
      },
    });
  }
};

// Define the type for the event listener callback
type EventListenerCallback = (event: Event, thisWebSocket: WebSocket) => void;

// Interface for the addEventListener method's parameter
interface AddEventListenerParam {
  name: string;
  type: string;
  onMessage: EventListenerCallback;
}

// Assuming WSManager has the following methods
interface WSManagerInterface {
  existenceEvent(eventName: string): boolean;
  addEventListener(param: AddEventListenerParam): void;
}

/**
 * Reconnects and ensures that it is a reconnection after login.
 * @param url The URL to reconnect to.
 */
const resConnect = (url: string): void => {
  const wsManager: WSManagerInterface = WSManager(url);
  if (!wsManager.existenceEvent(resetName)) {
    wsManager.addEventListener({
      name: resetName,
      type: 'open',
      onMessage: (event: Event, thisWebSocket: WebSocket): void => {
        // Additional SID verification or re-login could be added here
        resetSendInfo(url, thisWebSocket as any);
      },
    });
  }
};

// Define the structure of the data parameter (this should be adjusted to match the actual data structure)
interface LoginData {
  serverName?: string;
  // ... include other properties of the login data
}

// Define the type for the onMessage callback function
type OnMessageCallback = (event: MessageEvent, thisWebSocket: WebSocket) => void;

// Define the structure of the WebSocketManager object
interface WebSocketManager {
  selectWebSocket: () => WebSocketWithStatus;
  addEventListener: (options: EventListenerOptions) => void;
  addSid: (sid: string) => void;
  send: (data: any) => void; // Replace 'any' with the actual type of the data
}

// Define the structure of the WebSocket with additional properties like loginStatus
interface WebSocketWithStatus extends WebSocket {
  loginStatus?: boolean;
}

// Define the structure of the event listener options
interface EventListenerOptions {
  type: string;
  name: string;
  filter?: (event: MessageEvent, thisWebSocket: WebSocketWithStatus, options?: any) => boolean; // Replace 'any' with actual options type if needed
  onMessage: (event: MessageEvent, thisWebSocket: WebSocketWithStatus) => void;
}

const sendLoginDate = (
  url: string,
  data: LoginData,
  onMessage?: OnMessageCallback // onMessage is optional
): void => {
  let logOp: EventListenerOptions = {
    type: 'message',
    name: 'login_name',
    filter: (event: any, thisWebSocket: WebSocketWithStatus): boolean => {
      const msg = event.dataObject; // Assuming event.dataObject should be event.data
      return !!(msg && msg.cmd === protoCmd.CONNECT);
    },
    onMessage: (event: any, thisWebSocket: WebSocketWithStatus): void => {
      const msg = event.dataObject; // Assuming event.dataObject should be event.data
      if (msg.sid) {
        thisWebSocket.loginStatus = true;
        WSManager(url).addSid(msg.sid);
        resConnect(url);
      } else if (!onMessage) {
        // @ts-ignore
        const requestData = generateConnect(thisWebSocket.sid, data, thisWebSocket.dataType);
        WSManager(url).send(requestData);
      }
      if (onMessage) {
        onMessage(event, thisWebSocket);
      }
      if (msg.sid) {
        resetSendInfo(url, thisWebSocket as any);
      }
    },
  };

  const selectWebSocket = WSManager(url).selectWebSocket();
  if (selectWebSocket.loginType === loginType.login) {
    if (!data.serverName) {
      data.serverName = 'gateway';
    }
    WSManager(url).addEventListener(logOp);
    const requestData = generateConnect(selectWebSocket.sid, data, selectWebSocket.dataType);
    WSManager(url).send(requestData);
  }
};

// Define the structure of the WebSocket with eventListeners
interface WebSocketWithListeners extends WebSocket {
  eventListeners: {
    [listenerName: string]: EventListenerOptions;
  };
}

// Define the structure of the event listener options
interface EventListenerOptions {
  requestEnabled?: boolean;
  reqData?: any; // Replace 'any' with the actual request data type
  subscribe?: boolean;
  sendData?: any; // Replace 'any' with the actual send data type
}

const resetSendInfo = (url: string, selectWebSocket: WebSocketWithListeners): void => {
  resetSubscribe(url, selectWebSocket);
  resetRequest(url, selectWebSocket);
  sendWaitingData(url);
};

const sendWaitingData = (url: string): void => {
  const sendList = sendDataMap[url];
  if (sendList) {
    sendList.forEach((data) => {
      if (data) {
        send(url, data);
      }
    });
    sendDataMap[url] = [];
  }
};

const resetRequest = (url: string, selectWebSocket: WebSocketWithListeners): void => {
  Object.keys(selectWebSocket.eventListeners).forEach((listenerName) => {
    const options = selectWebSocket.eventListeners[listenerName];
    if (options.requestEnabled) {
      requestGenerateSeqRequest(url, options.reqData);
    }
  });
};

const resetSubscribe = (url: string, selectWebSocket: WebSocketWithListeners): void => {
  Object.keys(selectWebSocket.eventListeners).forEach((listenerName) => {
    const options = selectWebSocket.eventListeners[listenerName];
    if (options.subscribe) {
      subGenerateRequest(url, options.sendData);
    }
  });
};
