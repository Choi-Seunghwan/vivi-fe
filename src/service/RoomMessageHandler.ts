import type { App as VueApp } from 'vue';
import type ServiceWebSocket from './ServiceWebSocket';
import { MESSAGE_ROOM, METHOD_CREATE_ROOM } from '@/constant';

export class RoomMessageHandler extends{
  private app: VueApp;
  private serviceWebSocket: ServiceWebSocket;
  private receiveHandlers = {};

  constructor(app: VueApp, serviceWebSocket: ServiceWebSocket) {
    this.app = app;
    this.serviceWebSocket = serviceWebSocket;
    this.receiveHandlers = {};
  }

  getReceiveHandlers() {
    return this.receiveHandlers;
  }

  async createRoom({ title }) {
    await this.serviceWebSocket.sendMessage(MESSAGE_ROOM.CREATE_ROOM, { title });
  }
}
