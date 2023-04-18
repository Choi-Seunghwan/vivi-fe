import type { App as VueApp } from 'vue';
import type { Store } from 'vuex';
import { MessageHandler } from './MessageHandler';
import type ServiceWebSocket from './ServiceWebSocket';
import { MESSAGE_PC } from '@/constant';
import { PeerConnection } from '@/modules/PeerConnection';

export class ConnectionMessageHandler extends MessageHandler {
  private app: VueApp;
  private store: Store<any>;
  private serviceWebSocket: ServiceWebSocket;

  constructor(app, store: Store<any>, serviceWebSocket: ServiceWebSocket) {
    super();
    this.app = app;
    this.store = store;
    this.serviceWebSocket = serviceWebSocket;

    this.mappingReceiveHandlers({
      [MESSAGE_PC.RECEIVE_OFFER]: this.onReceiveOffer.bind(this)
    });
  }

  async onReceiveOffer({ offer, member }: { offer: object; member: RoomMember }) {
    const pc = new PeerConnection({ member });
    await pc.setOffer(offer);
    const answer = pc.createAnswer();
    this.serviceWebSocket.sendMessage(MESSAGE_PC.SEND_ANSWER, { socketId: member.socketId, answer });
  }

  async onReceiveAnswer({ answer, member }: { answer: object; member: RoomMember }) {
    const memberId = member.id;
    const pc: PeerConnection = this.store.getters['connection/getPeerConnection'](memberId);
    await pc.setAnswer(answer);
  }

  async onReceiveIceCandidate({ data, member }: { data: RTCIceCandidateInit; member: RoomMember }) {
    const memberId = member.id;
    const pc: PeerConnection = this.store.getters['connection/getPeerConnection'](memberId);
    pc.addIceCandidate(data.candidate);
  }
}
