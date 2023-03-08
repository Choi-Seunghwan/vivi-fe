import type { App as VueApp } from 'vue';
import ServiceWebSocket from './ServiceWebSocket';
import type { Store } from 'vuex';
import { RoomMessageHandler } from './RoomMessageHandler';
import { ChatMessageHandler } from './ChatMessageHandler';

export default class MessageManager {
  app: VueApp;
  store: Store<any>;
  serviceWebSocket: ServiceWebSocket;
  roomMessageHandler: RoomMessageHandler;
  chatMessageHandler: ChatMessageHandler;

  constructor(app: VueApp, store: Store<any>) {
    this.app = app;
    this.store = store;
    this.serviceWebSocket = new ServiceWebSocket();

    this.roomMessageHandler = new RoomMessageHandler(app, store, this.serviceWebSocket);
    this.chatMessageHandler = new ChatMessageHandler(app, store, this.serviceWebSocket);

    this.serviceWebSocket.setReceiveHandlers({
      ...this.chatMessageHandler.getReceiveHandlers(),
      ...this.roomMessageHandler.getReceiveHandlers()
    });
    // eventManager.setEvent(EVENT_ICE_CANDIDATE, this.sendICECandidate.bind(this));
  }

  getServiceWebSocket(): ServiceWebSocket {
    return this.serviceWebSocket;
  }

  /**
   * session description

  async sendSessionDescOfferToRoomAllMembers() {
    const room = this.store?.state?.room?.room;
    const members = room.members;
    const socketId = this.serviceWebSocket.getSocketId();

    for (let i = 0; i < members.length; i++) {
      // 본인이 아니라면
      if (socketId !== members[i].socketId) await this.sendSessionDescOfferToRoomMember({ member: members[i] });
    }
  }

  async sendSessionDescOfferToRoomMember({ member }: { member }) {
    const room = this.store?.state?.room?.room;
    if (!room) return;

    // const localStream = mediaManager.getLocalStream();

    // member.peerConnection = new PeerConnection({ member, localStream });
    const offer = await member?.peerConnection?.createOffer();
    const _member = { ...member, peerConnection: null };

    await this.serviceWebSocket.sendMessage(`room/${METHOD_SEND_SESSION_DESC_OFFER}`, {
      roomId: room.roomId,
      member: _member,
      offer
    });
  }

  async sendSessionDescAnswer({ member, answer }: { member; answer }) {
    const room = this.store?.state?.room?.room;
    if (!room) return;
    await this.serviceWebSocket.sendMessage(`room/${METHOD_SEND_SESSION_DESC_ANSWER}`, {
      roomId: room.roomId,
      member,
      answer
    });
  }

  async sendICECandidate({ candidate, member }: { candidate; member }) {
    const room = this.store?.state?.room?.room;
    const _member = { ...member, peerConnection: null };
    if (!room) return;
    await this.serviceWebSocket.sendMessage(`room/${METHOD_SEND_ICE_CANDIDATE}`, {
      roomId: room.roomId,
      candidate,
      member: _member
    });
  }
  */
}
