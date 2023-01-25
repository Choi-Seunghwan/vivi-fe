import type { App as VueApp } from 'vue';
import type ServiceWebSocket from './ServiceWebSocket';
import { MESSAGE_ROOM, METHOD_CREATE_ROOM } from '@/constant';
import { MessageHandler } from './MessageHandler';

export class RoomMessageHandler extends MessageHandler {
  private app: VueApp;
  private serviceWebSocket: ServiceWebSocket;

  constructor(app: VueApp, serviceWebSocket: ServiceWebSocket) {
    super();
    this.app = app;
    this.serviceWebSocket = serviceWebSocket;

    this.mappingReceiveHandlers({
      [MESSAGE_ROOM.CREATE_ROOM]: this.onCreateRoom.bind(this)
    });
  }

  async createRoom({ title }) {
    this.serviceWebSocket.sendMessage(MESSAGE_ROOM.CREATE_ROOM, { title });
  }

  async onCreateRoom() {
    console.log('@@ roomCreated');
  }

  async test() {
    this.serviceWebSocket.sendMessage('ROOM/test', {});
  }
}
