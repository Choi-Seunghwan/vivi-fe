import type { App as VueApp } from 'vue';
import type ServiceWebSocket from './ServiceWebSocket';
import { MessageHandler } from './MessageHandler';
import { MESSAGE_CHAT_MESSAGE } from '@/constant';

export class ChatMessageHandler extends MessageHandler {
  private app: VueApp;
  private serviceWebSocket: ServiceWebSocket;

  constructor(app: VueApp, serviceWebSocket: ServiceWebSocket) {
    super();
    this.app = app;
    this.serviceWebSocket = serviceWebSocket;
    this.mappingReceiveHandlers({
      [MESSAGE_CHAT_MESSAGE.ON_RECEIVE_CHAT_MESSAGE]: this.onReceiveChatMessage
    });
  }

  sendChatMessage() {}

  onReceiveChatMessage() {}
}
