import type { App as VueApp } from 'vue';
import type ServiceWebSocket from './ServiceWebSocket';
import { MESSAGE_ROOM, METHOD_CREATE_ROOM } from '@/constant';

export class RoomMessageHandler {
  app: VueApp;
  serviceWebSocket: ServiceWebSocket;
  ROOM_PATH: string = import.meta.env.VITE_API_PATH_ROOM;

  constructor(app: VueApp, serviceWebSocket: ServiceWebSocket) {
    this.app = app;
    this.serviceWebSocket = serviceWebSocket;
  }

  async createRoom({ title }) {
    await this.serviceWebSocket.sendMessage(MESSAGE_ROOM.CREATE_ROOM, { title });
  }
}
