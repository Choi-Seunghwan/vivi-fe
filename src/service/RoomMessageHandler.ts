import type { App as VueApp } from 'vue';
import type ServiceWebSocket from './ServiceWebSocket';
import { MESSAGE_ROOM } from '@/constant';
import { MessageHandler } from './MessageHandler';
import logger from '@/utils/Logger';
import type { Store } from 'vuex';

export class RoomMessageHandler extends MessageHandler {
  private app: VueApp;
  private store: Store<any>;
  private serviceWebSocket: ServiceWebSocket;

  constructor(app: VueApp, store: Store<any>, serviceWebSocket: ServiceWebSocket) {
    super();
    this.app = app;
    this.store = store;
    this.serviceWebSocket = serviceWebSocket;

    this.mappingReceiveHandlers({
      [MESSAGE_ROOM.NEW_ROOM_MEMBER_JOINED]: this.onNewRoomMemberJoined.bind(this),
      [MESSAGE_ROOM.HOST_LEAVED]: this.onHostLeaved.bind(this)
    });
  }

  async createRoom({ title }) {
    try {
      this.serviceWebSocket.sendMessage(MESSAGE_ROOM.CREATE_ROOM, { title }, this.ackCreateRoom.bind(this));
    } catch (e) {
      throw e;
    }
  }

  async ackCreateRoom(room: Room) {
    try {
      if (!room) throw new Error('ackCreateRoom room Error');

      await this.store.dispatch('room/setRoom', { room });
    } catch (e) {
      throw e;
    }
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
    try {
      if (!room) throw new Error(`ackJoinRoom Error`);

      await this.store.dispatch('room/setRoom', room);
    } catch (e) {
      throw e;
    }
  }

  async onNewRoomMemberJoined({
    roomMember,
    roomId,
    chatMessage
  }: {
    roomMember: RoomMember;
    roomId: string;
    chatMessage: ChatMessage;
  }) {
    try {
      const room: Room = this.store.getters['room/getRoom'];
      if (!room || !roomMember) return;

      if (chatMessage) this.store.dispatch('chat/addChatMessage', { chatMessage });
    } catch (e) {
      throw e;
    }
  }

  async leaveRoom() {
    try {
      const room: Room = this.store.getters['room/getRoom'];
      if (!room) return;

      this.serviceWebSocket.sendMessage(MESSAGE_ROOM.LEAVE_ROOM, { roomId: room.roomId });
    } catch (e) {
      throw e;
    }
  }

  async onHostLeaved() {
    try {
      const room: Room = this.store.getters['room/getRoom'];
      if (!room) return;

      await this.store.dispatch('room/setRoom', null);
    } catch (e) {
      throw e;
    }
  }
}
