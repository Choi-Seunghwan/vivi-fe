import type { App as VueApp } from 'vue';
import ServiceWebSocket from './ServiceWebSocket';
import type { Store } from 'vuex';
import { RoomMessageHandler } from './RoomMessageHandler';
import { ChatMessageHandler } from './ChatMessageHandler';
import { ConnectionMessageHandler } from './ConnectionMessageHandler';

export default class MessageManager {
  app: VueApp;
  store: Store<any>;
  serviceWebSocket: ServiceWebSocket;
  roomMessageHandler: RoomMessageHandler;
  chatMessageHandler: ChatMessageHandler;
  connectionMessageHandler: ConnectionMessageHandler;

  constructor(app: VueApp, store: Store<any>) {
    this.app = app;
    this.store = store;
    this.serviceWebSocket = new ServiceWebSocket();

    this.roomMessageHandler = new RoomMessageHandler(app, store, this.serviceWebSocket);
    this.chatMessageHandler = new ChatMessageHandler(app, store, this.serviceWebSocket);
    this.connectionMessageHandler = new ConnectionMessageHandler(app, store, this.serviceWebSocket);

    this.serviceWebSocket.setReceiveHandlers({
      ...this.chatMessageHandler.getReceiveHandlers(),
      ...this.roomMessageHandler.getReceiveHandlers(),
      ...this.connectionMessageHandler.getReceiveHandlers()
    });
  }

  getServiceWebSocket(): ServiceWebSocket {
    return this.serviceWebSocket;
  }
}
