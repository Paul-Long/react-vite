// Importing necessary modules and types
import EventHandler from './event-handler';
import {generateHeartbeat} from './utils/proto-utils';
import WSEnum from './utils/ws-const';

// Destructuring enums from WSEnum
const {protoKey, protoCmd, protoFormat, loginType, dataType} = WSEnum;

// Toggle for printing logs
const _printLog = true;

// WebSocket list to keep track of all connections
const ws_list: Record<string, any> = {};

// Helper function to print logs with a specific style
const printLog = (message: string): void => {
  if (_printLog) {
    console.log(`%c${message}`, 'color:#39f;font-family: Console');
  }
};

// Function to send a heartbeat or ping message
const heart = (thisWebSocket: any): void => {
  const status = isConnectStatus(thisWebSocket.url, thisWebSocket);
  if (status) {
    if (thisWebSocket.sid) {
      const data = generateHeartbeat(thisWebSocket.sid);
      send(data, thisWebSocket);
    } else {
      send('ping', thisWebSocket);
    }
  }
};

// Function to send data through the WebSocket connection
const send = (data: any, selectWebSocket: any): void => {
  if (selectWebSocket.dataType === dataType.t_json) {
    selectWebSocket['connection'].send(JSON.stringify(data));
  } else {
    selectWebSocket['connection'].send(data);
  }
};

// Function to check if an event listener exists
const existenceEvent = (selectWebSocket: any, listenerName: string): boolean => {
  return !!selectWebSocket.eventListeners[listenerName];
};

// Function to check the connection status of the WebSocket
const isConnectStatus = (url: string, selectWebSocket: any): boolean => {
  let status = false;
  const readyState = selectWebSocket['connection'].readyState;
  if (readyState === WebSocket.OPEN) {
    if (selectWebSocket.loginType === loginType.sid && selectWebSocket.sid) {
      // If login type is 'sid' and 'sid' is not null
      status = true;
    } else if (selectWebSocket.loginType === loginType.login && selectWebSocket.loginStatus) {
      // If login type is 'login' and login was successful
      status = true;
    }
  }
  if (!status) {
    console.warn(
      `WebSocket url:${url} readyState:${readyState} loginType:${selectWebSocket.loginType} sid:${selectWebSocket.sid} loginStatus:${selectWebSocket.loginStatus}`
    );
  }
  return status;
};

// Function to define default event listeners
const defaultEventListeners = (): Record<string, any> => {
  return {
    reconnect: {
      name: 'reconnect',
      type: 'close',
      onMessage: (event: CloseEvent, thisWebSocket: any) => {
        printLog(
          `WebSocket Manager: connection ${thisWebSocket.url} closed at code:${event.code}.`
        );
        // Codes for server shutdown or restart, server failure, server exception, server overload
        thisWebSocket.closeCode = event.code;
        if (event.code !== 1000) {
          printLog(`WebSocket Manager: Lost connection from ${thisWebSocket.url}.`);
          let status = false;
          if (thisWebSocket.reconnect === -1) {
            status = true;
          } else {
            if (thisWebSocket.reconnectTry < thisWebSocket.reconnect) {
              thisWebSocket.reconnectTry += 1;
              status = true;
            }
          }
          if (status) {
            clearInterval(thisWebSocket.heartInterval);
            thisWebSocket.heartInterval = null;
            thisWebSocket.loginStatus = false;
            const reconnect = () => {
              if (
                thisWebSocket.connection &&
                thisWebSocket.connection.readyState !== WebSocket.OPEN
              ) {
                printLog(
                  `WebSocket Manager: try to reconnect ${thisWebSocket.url} at ${thisWebSocket.reconnectTry}/${thisWebSocket.reconnect}`
                );
                thisWebSocket.start();
              }
            };
            let delay = thisWebSocket.reconnectDelay;
            setTimeout(reconnect, delay * 1000);
          }
        }
      },
    },
    resetReconnect: {
      name: 'reset-reconnect',
      type: 'open',
      onMessage: (event: Event, thisWebSocket: any) => {
        thisWebSocket.reconnectTry = 0;
        if (thisWebSocket.heartInterval == null) {
          thisWebSocket.heartInterval = setInterval(() => {
            heart(thisWebSocket);
          }, 20000);
        }
      },
    },
  };
};

// Function to create a new WebSocket connection
export const WSCreate = (op: any) => {
  if (!ws_list[op.url]) {
    ws_list[op.url] = {
      eventListeners: defaultEventListeners(),
      reconnectTry: 0,
      closeCode: 1000,
      heartInterval: null,
      ...op,
      start: ((url: string) => {
        return () => {
          if (
            !ws_list[url]['connection'] ||
            ws_list[url]['connection'].readyState === WebSocket.CLOSED
          ) {
            try {
              const webSocket = new WebSocket(url);
              if (op.dataType === dataType.t_byte || op.dataType === dataType.t_gzip) {
                webSocket.binaryType = 'arraybuffer';
              }
              webSocket.onopen = (event) => EventHandler.call(null, url, event);
              webSocket.onmessage = (event) => EventHandler.call(null, url, event);
              webSocket.onclose = (event) => EventHandler.call(null, url, event, 'close');
              webSocket.onerror = (event) => EventHandler.call(null, url, event, 'error');
              ws_list[url]['connection'] = webSocket;
              printLog(`WebSocket Manager, WebSocket start on ${url}.`);
            } catch (err) {
              console.error(err);
            }
          }
        };
      })(op.url),
    };
  }
  printLog(`WebSocket Manager: WebSocket create on ${op.url}.`);
};

// WebSocket manager function to handle various operations on WebSocket connections
export const WSManager = (url: string) => {
  const selectWebSocket = ws_list[url] || {};
  selectWebSocket.url = url;
  return {
    createdStatus: (): boolean => {
      return !!ws_list[url];
    },
    selectWebSocket: (): any => selectWebSocket,
    addEventListener: (option: any) => {
      if (!option.type) {
        // type = message, open, close
        console.error(`WebSocket Manager: Missing listener.type is null on WebSocket ${url}!`);
        return;
      }
      if (!option.name) {
        console.error(`WebSocket Manager: Missing listener.name is null on WebSocket ${url}!`);
        return;
      }
      if (option.subscribe) {
        let status = existenceEvent(selectWebSocket, option.name);
        if (status) {
          console.error(
            `WebSocket Manager: Missing listener.name already exists on WebSocket ${url}!`
          );
          return;
        }
      }

      if (!option.onMessage) {
        console.error(`WebSocket Manager: Missing listener.onMessage is null on WebSocket ${url}!`);
        return;
      }
      try {
        selectWebSocket.eventListeners[option.name] = option;
      } catch (err) {
        console.error(
          `WebSocket Manager: Add event listener failed ${
            option.name || '[type=' + option.type + ']'
          } url:${url}`
        );
        return;
      }
    },
    removeEventListener: (listenerName: string) => {
      if (!listenerName) {
        console.error(`WebSocket Manager: Missing listener.name on name ${listenerName}!`);
      }
      if (selectWebSocket.eventListeners[listenerName]) {
        delete selectWebSocket.eventListeners[listenerName];
      }
    },
    existenceEvent: (listenerName: string): boolean => {
      return existenceEvent(selectWebSocket, listenerName);
    },
    start: (): void => selectWebSocket.start(),
    readyState: (): number => selectWebSocket['connection'].readyState,
    closeCode: (): number => selectWebSocket.closeCode,
    send: (data: any): void => {
      send(data, selectWebSocket);
    },
    isConnectStatus: (): boolean => {
      return isConnectStatus(url, selectWebSocket);
    },
    close: (): void => {
      if (
        selectWebSocket['connection'] &&
        selectWebSocket['connection'].readyState === WebSocket.OPEN
      ) {
        printLog(`WebSocket Manager: Operation on connection ${url} close!`);
        selectWebSocket['connection'].close();
      }
    },
    addSid: (sid: string): void => {
      selectWebSocket.sid = sid;
    },
  };
};
