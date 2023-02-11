import type { App as VueApp } from 'vue';
import type ServiceWebSocket from './ServiceWebSocket';
import { MESSAGE_ROOM, METHOD_CREATE_ROOM } from '@/constant';
import { MessageHandler } from './MessageHandler';
import logger from '@/utils/Logger';

export class RoomMessageHandler extends MessageHandler {
  private app: VueApp;
  private serviceWebSocket: ServiceWebSocket;

  constructor(app: VueApp, serviceWebSocket: ServiceWebSocket) {
    super();
    this.app = app;
    this.serviceWebSocket = serviceWebSocket;

    this.mappingReceiveHandlers({
      [MESSAGE_ROOM.NEW_ROOM_MEMBER_JOINED]: this.onNewRoomMemberJoined
    });
  }

  async createRoom({ title }) {
    this.serviceWebSocket.sendMessage(MESSAGE_ROOM.CREATE_ROOM, { title }, this.ackCreateRoom.bind(this));
  }

  async ackCreateRoom(room: Room) {
    logger.debug(this.ackCreateRoom.name, room);
  }

  async joinRoom(roomId) {
    try {
      if (!roomId) throw new Error(`roomId Err. roomId: ${roomId}`);
      this.serviceWebSocket.sendMessage(MESSAGE_ROOM.JOIN_ROOM, { roomId }, this.ackJoinRoom.bind(this));
    } catch (e) {
      throw e;
    }
  }

  async ackJoinRoom(room: Room) {
    logger.debug(this.ackJoinRoom.name, room);
  }

  async test() {
    this.serviceWebSocket.sendMessage('ROOM/test', {});
  }

  async onNewRoomMemberJoined(message) {
    logger.debug(message);
    logger.debug(this);
  }
}
