import {byteToProto} from './utils/proto-utils';
import {WSManager} from './websocket-manager';

import WSEnum from './utils/ws-const';
const {dataType} = WSEnum;

// Define the structure of the event listener options
interface EventListenerOptions {
  type: string;
  onMessage: (event: MessageEvent | Event, selectWebSocket: any) => void;
  filter?: (
    event: MessageEvent | Event,
    selectWebSocket: any,
    options: EventListenerOptions
  ) => boolean;
}

// Define the structure of the selectWebSocket object
interface SelectWebSocket {
  dataType: string;
  eventListeners: Record<string, EventListenerOptions>;
}

// The EventHandler function processes events from the WebSocket and invokes the appropriate listeners
const EventHandler = (url: string, event: MessageEvent | Event, type?: string): void => {
  if (['close', 'error'].includes(type || '')) {
    console.info('type, event', type, event);
  }

  let data: any = {};
  const selectWebSocket: SelectWebSocket = WSManager(url).selectWebSocket();

  try {
    if (event instanceof MessageEvent && event.data) {
      if (selectWebSocket.dataType === dataType.t_json) {
        data = JSON.parse(event.data);
      } else {
        data = byteToProto(event.data, selectWebSocket.dataType);
      }
    }
  } catch (e) {
    console.error(
      `EventHandler format failed, url: "${url}", dataType: "${selectWebSocket.dataType}"`
    );
    console.error(e);
  }

  // Adding a new property to the event object to store the parsed data
  (event as any).dataObject = data;

  // Iterating over the event listeners and invoking them if the event type matches
  Object.keys(selectWebSocket.eventListeners).forEach((listenerName) => {
    const options = selectWebSocket.eventListeners[listenerName];
    if (event.type === options.type) {
      let status = true;
      try {
        if (options.filter) {
          status = options.filter(event, selectWebSocket, options);
        }
      } catch (err) {
        console.error(
          `WebSocket, url: "${url}", listener.filter error on listener name: "${listenerName}"`
        );
        console.error(err);
      }
      if (status) {
        try {
          options.onMessage(event, selectWebSocket);
        } catch (err) {
          console.error(
            `WebSocket, url: "${url}", listener.onMessage error on listener name: "${listenerName}"`
          );
          console.error(err);
        }
      }
    }
  });
};

export default EventHandler;
