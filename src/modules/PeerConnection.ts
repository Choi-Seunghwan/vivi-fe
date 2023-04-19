import eventManager from '@/modules/EventManager';
import { EVENT_ICE_CANDIDATE, EVENT_ON_TRACK } from '@/constant';

export interface OnTrackEvent {
  peerconnection: PeerConnection;
  remoteStream: MediaStream;
}

export class PeerConnection {
  pc: RTCPeerConnection;
  member: RoomMember;
  localStream?: MediaStream | null;
  iceServers = [
    {
      urls: [
        'stun:stun.l.google.com:19302',
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
        'stun:stun3.l.google.com:19302',
        'stun:stun4.l.google.com:19302'
      ]
    }
  ];

  constructor({ member, localStream = null }: { member: RoomMember; localStream?: MediaStream | null }) {
    this.pc = new RTCPeerConnection({ iceServers: this.iceServers });
    this.member = member;
    this.pc.addEventListener('icecandidate', this.iceCandidateHandler.bind(this));
    this.pc.onicegatheringstatechange = event => {
      console.log('oniceconnectionstatechange', event);
    };

    this.pc.ontrack = trackEvent => {
      const { streams } = trackEvent;
      const remoteStream = streams[0];
      eventManager.callEvent(EVENT_ON_TRACK, { peerConnection: this, remoteStream });
    };

    if (localStream) {
      this.localStream = localStream as MediaStream;

      this.localStream?.getTracks().forEach(track => {
        this.pc.addTrack(track, this.localStream as MediaStream);
      });
    }
  }

  async createOffer() {
    const offer = await this.pc.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true
    });
    await this.pc.setLocalDescription(new RTCSessionDescription(offer));
    return offer;
  }

  async setOffer(offer) {
    await this.pc.setRemoteDescription(new RTCSessionDescription(offer));
  }

  async createAnswer() {
    const answer = await this.pc.createAnswer();
    await this.pc.setLocalDescription(answer);
    return answer;
  }

  async setAnswer(answer) {
    await this.pc.setRemoteDescription(answer);
  }

  async iceCandidateHandler(event: RTCPeerConnectionIceEvent) {
    const { candidate } = event;
    eventManager.callEvent(EVENT_ICE_CANDIDATE, {
      candidate,
      member: this.member
    });
  }

  async addIceCandidate(candidate) {
    await this.pc.addIceCandidate(new RTCIceCandidate(candidate));
  }
}
