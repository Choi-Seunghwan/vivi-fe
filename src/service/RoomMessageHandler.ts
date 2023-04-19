import type { App as VueApp } from 'vue';
import type ServiceWebSocket from './ServiceWebSocket';
import { MESSAGE_PC, MESSAGE_ROOM } from '@/constant';
import { MessageHandler } from './MessageHandler';
import type { Store } from 'vuex';
import type { ChatMessage } from '@/types/chat';
import { PeerConnection } from '@/modules/PeerConnection';
import { mediaManager } from '@/modules/MediaManager';

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

  async ackCreateRoom(result: CreateRoomResult) {
    try {
      if (!result || result?.error) throw new Error('ackCreateRoom room Error');

      await this.store.dispatch('room/setRoom', { room: result });
      this.runAckHandler(this.ackCreateRoom.name);
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

  async ackJoinRoom(result: JoinRoomResult) {
    try {
      if (result?.error) {
        this.runAckHandler(this.ackJoinRoom.name, { result: false });
        throw new Error(`ackJoinRoom Error`);
      }

      const host = result.host;
      const hostRoomMember = result.members.find(m => m.id === host.id);
      const pc = new PeerConnection({ member: hostRoomMember });

      await this.store.dispatch('connection/setPc', { pc });
      await this.store.dispatch('room/setRoom', { room: result });
      this.runAckHandler(this.ackJoinRoom.name, { result });

      const offer = await pc.createOffer();
      this.serviceWebSocket.sendMessage(MESSAGE_PC.SEND_OFFER, { socketId: hostRoomMember.socketId, offer });
    } catch (e) {
      throw e;
    }
  }

  async onNewRoomMemberJoined({
    roomMember,
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
