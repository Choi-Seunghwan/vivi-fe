import { PeerConnection } from '@/modules/PeerConnection';
import api from '@/service/api';
import type { Member, Room, ServiceResultRes, Account } from '@/vivi-utils/types';
import {
  METHOD_CREATE_ROOM,
  METHOD_JOIN_ROOM,
  METHOD_LEAVE_ROOM,
  METHOD_SEND_ROOM_CHAT_MESSAGE,
  METHOD_SEND_SESSION_DESC_OFFER,
  METHOD_SEND_SESSION_DESC_ANSWER,
  METHOD_SEND_ICE_CANDIDATE
} from '@/vivi-utils/constants';
import { EVENT_ICE_CANDIDATE } from '@/constant';
import eventManager from '@/modules/EventManager';
import ServiceWebSocket from '@/service/ServiceWebSocket';
import mediaManager from '@/modules/MediaManager';
import AuthService from './AuthService';
import type { Store } from 'vuex';
import type { App as VueApp } from 'vue';

/*
export const servicePlugin = {
  install(Vue) {
    Vue.config.globalProperties._service = new ServiceManager();
  }
};
*/

export default class ServiceManager {
  app: VueApp;
  store: Store<any>;
  sWs: ServiceWebSocket;
  authService: AuthService;

  constructor(app: VueApp, store: Store<any>) {
    this.app = app;
    this.store = store;
    // eventManager.setEvent(EVENT_ICE_CANDIDATE, this.sendICECandidate.bind(this));

    /** Init Services... */
    this.sWs = new ServiceWebSocket(app);
    this.authService = new AuthService(app);
  }

  /**
   * Room
   */

  async getRoomList({ tag = '' } = {}): Promise<Room[]> {
    let query = '';
    query += !!tag ? `?tag=${tag}` : '';
    const response: ServiceResultRes = await api.get('room/list' + query);
    const { roomList }: { roomList: Room[] } = response?.result;
    return roomList;
  }

  async createRoom({ title, type, tag }) {
    await this.sWs.sendMessage(`room/${METHOD_CREATE_ROOM}`, { title, type, tag });
  }

  async joinRoom({ roomId }: { roomId: number }) {
    this.store.dispatch('room/setRoomConnectionStatus', {
      status: 'CONNECTING'
    });
    await this.sWs.sendMessage(`room/${METHOD_JOIN_ROOM}`, { roomId });
  }

  async leaveRoom() {
    const room: Room = this.store?.state?.room?.room;
    if (!room) return;
    await this.sWs.sendMessage(`room/${METHOD_LEAVE_ROOM}`, {
      roomId: room.roomId
    });
    this.store.dispatch('room/leaveRoom');
  }

  /**
   * Chat
   */

  async sendChatMessage({ roomId, message }: { roomId: number; message: string }) {
    await this.sWs.sendMessage(`room/${METHOD_SEND_ROOM_CHAT_MESSAGE}`, {
      roomId,
      message
    });
  }

  /**
   * session description
   */
  async sendSessionDescOfferToRoomAllMembers() {
    const room: Room = this.store?.state?.room?.room;
    const members: Member[] = room.members;
    const socketId = this.sWs.getSocketId();

    for (let i = 0; i < members.length; i++) {
      // 본인이 아니라면
      if (socketId !== members[i].socketId) await this.sendSessionDescOfferToRoomMember({ member: members[i] });
    }
  }

  async sendSessionDescOfferToRoomMember({ member }: { member: Member }) {
    const room: Room = this.store?.state?.room?.room;
    if (!room) return;

    const localStream = mediaManager.getLocalStream();

    member.peerConnection = new PeerConnection({ member, localStream });
    const offer = await member?.peerConnection?.createOffer();
    const _member = { ...member, peerConnection: null };

    await this.sWs.sendMessage(`room/${METHOD_SEND_SESSION_DESC_OFFER}`, {
      roomId: room.roomId,
      member: _member,
      offer
    });
  }

  async sendSessionDescAnswer({ member, answer }: { member: Member; answer }) {
    const room: Room = this.store?.state?.room?.room;
    if (!room) return;
    await this.sWs.sendMessage(`room/${METHOD_SEND_SESSION_DESC_ANSWER}`, {
      roomId: room.roomId,
      member,
      answer
    });
  }

  async sendICECandidate({ candidate, member }: { candidate; member: Member }) {
    const room: Room = this.store?.state?.room?.room;
    const _member = { ...member, peerConnection: null };
    if (!room) return;
    await this.sWs.sendMessage(`room/${METHOD_SEND_ICE_CANDIDATE}`, {
      roomId: room.roomId,
      candidate,
      member: _member
    });
  }

  /**
   * Account
   */

  async changeNickname(nickname) {
    const isLogin = this.store.getters['auth/isLogin'];

    if (!isLogin) {
      const userInfo: Account = this.store.getters['auth/userInfo'];
      const connectionId = userInfo?.connectionId;
      const result: ServiceResultRes = await api.patch('account/nickname', { nickname, connectionId });

      const account = result?.result?.account;
      this.store.dispatch('auth/setuserInfo', { account });
    }
  }
}
