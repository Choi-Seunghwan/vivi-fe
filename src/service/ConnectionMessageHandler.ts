import type { App as VueApp } from 'vue';
import type { Store } from 'vuex';
import { MessageHandler } from './MessageHandler';
import type ServiceWebSocket from './ServiceWebSocket';
import { EVENT_ICE_CANDIDATE, MESSAGE_PC } from '@/constant';
import { PeerConnection } from '@/modules/PeerConnection';
import eventManager from '@/modules/EventManager';
import type { PcMap } from '@/store/connection.store';
import { mediaManager } from '@/modules/MediaManager';

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
      [MESSAGE_PC.RECEIVE_OFFER]: this.onReceiveOffer.bind(this),
      [MESSAGE_PC.RECEIVE_ANSWER]: this.onReceiveAnswer.bind(this),
      [MESSAGE_PC.RECEIVE_ICE_CANDIDATE]: this.onReceiveIceCandidate.bind(this)
    });

    eventManager.setEvent(EVENT_ICE_CANDIDATE, this.sendIceCandidate.bind(this));
  }

  async onReceiveOffer({ offer, member }: { offer: object; member: RoomMember }) {
    const localStream = mediaManager.getLocalStream() as MediaStream;

    if (!localStream) return;

    const pc = new PeerConnection({ member, localStream });

    await this.store.dispatch('connection/setPc', { pc });
    await pc.setOffer(offer);

    const answer = await pc.createAnswer();

    this.serviceWebSocket.sendMessage(MESSAGE_PC.SEND_ANSWER, { socketId: member.socketId, answer });
  }

  async onReceiveAnswer({ answer, member }: { answer: object; member: RoomMember }) {
    const memberId = member.id;
    const pcs: PcMap = this.store.getters['connection/getPeerConnection'];
    const pc = pcs.get(memberId) as PeerConnection;

    await pc.setAnswer(answer);
  }

  async sendIceCandidate({ candidate, member }: { candidate: RTCIceCandidate; member: RoomMember }) {
    const socketId = member.socketId;
    this.serviceWebSocket.sendMessage(MESSAGE_PC.SEND_ICE_CANDIDATE, { socketId, candidate });
  }

  async onReceiveIceCandidate({ candidate, member }: { candidate: RTCIceCandidateInit; member: RoomMember }) {
    const memberId = member.id;
    const pcs: PcMap = this.store.getters['connection/getPeerConnection'];
    const pc = pcs.get(memberId) as PeerConnection;
    await pc.addIceCandidate(candidate);
  }
}
