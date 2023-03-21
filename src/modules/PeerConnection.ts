import eventManager from '@/modules/EventManager';
import { EVENT_ICE_CANDIDATE, EVENT_ON_TRACK } from '@/constant';

export class PeerConnection {
  pc: RTCPeerConnection;
  member: RoomMember;
  localStream?: MediaStream;
  remoteStream?;
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

  constructor({ member, socket }) {
    this.pc = new RTCPeerConnection({ iceServers: this.iceServers });
    this.member = member;
    this.pc.addEventListener('icecandidate', this.iceCandidateHandler.bind(this));
    this.pc.onicegatheringstatechange = e => {
      console.log('@@ oniceconnectionstatechange', this.pc.iceGatheringState);
    };

    this.pc.ontrack = trackEvent => {
      const { streams } = trackEvent;
      const remoteStream = streams[0];
      this.remoteStream = remoteStream;
      eventManager.callEvent(EVENT_ON_TRACK, { peerConnection: this, remoteStream });
    };

    // if (localStream) {
    //   this.localStream.getTracks().forEach(track => {
    //     this.pc.addTrack(track, this.localStream);
    //   });
    // }
  }

  async createOffer() {
    const offer = await this.pc.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true
    });
    await this.pc.setLocalDescription(offer);
    return offer;
  }

  async setOffer(offer) {
    await this.pc.setRemoteDescription(offer);
  }

  async createAnswer() {
    const answer = await this.pc.createAnswer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true
    });
    this.pc.setLocalDescription(answer);
    return answer;
  }

  async setAnswer(remoteDesc) {
    await this.pc.setRemoteDescription(remoteDesc);
  }

  async iceCandidateHandler(data) {
    const { candidate } = data;
    // eventManager를 통해 PeerConection 외부의 모듈로 이벤트 송신
    eventManager.callEvent(EVENT_ICE_CANDIDATE, {
      candidate,
      member: this.member
    });
  }

  async addIceCandidate(candidate) {
    await this.pc.addIceCandidate(candidate);
  }
}
