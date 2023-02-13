import type { App as VueApp } from 'vue';
import type ServiceWebSocket from './ServiceWebSocket';
import { MessageHandler } from './MessageHandler';
import { MESSAGE_CHAT } from '@/constant';
import type { Store } from 'vuex';

export class ChatMessageHandler extends MessageHandler {
  private app: VueApp;
  private store: Store<any>;
  private serviceWebSocket: ServiceWebSocket;

  constructor(app: VueApp, store: Store<any>, serviceWebSocket: ServiceWebSocket) {
    super();
    this.app = app;
    this.store = store;
    this.serviceWebSocket = serviceWebSocket;
    this.mappingReceiveHandlers({
      [MESSAGE_CHAT.ROOM_CHAT_MESSAGE]: this.onRoomChatMessage.bind(this)
    });
  }

  sendRoomChatMessage(message: SendChatMessage) {
    this.serviceWebSocket.sendMessage(MESSAGE_CHAT.SEND_ROOM_CHAT_MESSAGE, { message });
  }

  onRoomChatMessage(message) {
    console.log('@@ message', message);
    // this.store.dispatch()
  }
}
