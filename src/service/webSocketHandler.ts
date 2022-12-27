import _remove from 'lodash/remove';
import {
  METHOD_CREATE_ROOM,
  METHOD_JOIN_ROOM,
  MEMBER_ROOM_JOINED,
  METHOD_LEAVE_ROOM,
  MEMBER_LEAVE_ROOM,
  ROOM_CHAT_MESSAGE,
  METHOD_SEND_SESSION_DESC_OFFER,
  SESSION_DESC_OFFER,
  SESSION_DESC_ANSWER,
  ICE_CANDIDATE,
  HOST_LEAVE_ROOM,
  METHOD_MY_ACCOUNT_INFO
} from '@/constant';

import { PeerConnection } from '@/modules/PeerConnection';
import mediaManager from '@/modules/MediaManager';

const webSocketHandler = async ({ app, method, args }) => {
  const splitedMethod = method.split('/');
  const { result, resultCode, statusCode, description } = args;
  const _service = app._service;
  const _store = app.$store;

  switch (splitedMethod[0]) {
    case 'auth':
      switch (splitedMethod[1]) {
        case METHOD_MY_ACCOUNT_INFO: {
          const { account } = result;
          _store.dispatch('auth/setuserInfo', { account }, { root: true });
          break;
        }
      }
      break;
    case 'room':
      switch (splitedMethod[1]) {
        case METHOD_CREATE_ROOM: {
          const { room } = result;
          await app.$store.dispatch('room/setRoom', { room: room }, { root: true });
          break;
        }

        case METHOD_JOIN_ROOM: {
          const { room } = result;
          await _store.dispatch('room/setRoom', { room: room }, { root: true });
          await _store.dispatch('room/setRoomConnectionStatus', { status: 'COMPLETE' }, { root: true });
          // _service.sendSessionDescOfferToRoomAllMembers();
          break;
        }

        case MEMBER_ROOM_JOINED: {
          const { room, member }: { room: Room; member: Member } = result;
          const currentRoom: Room = _store.state?.room?.room;
          if (room.roomId === currentRoom.roomId) {
            const members = currentRoom.members;
            members.push(member);
          }
          break;
        }

        case METHOD_LEAVE_ROOM: {
          _store.dispatch('room/leaveRoom');
          break;
        }
        case HOST_LEAVE_ROOM: {
          const { room, member, isHostLeave }: { room: Room; member: Member; isHostLeave: Boolean } = result;
          const currentRoom: Room = _store.state?.room?.room;

          if (room?.roomId === currentRoom?.roomId && isHostLeave) {
            _store.dispatch('room/leaveRoom');
          }

          break;
        }

        case MEMBER_LEAVE_ROOM: {
          const { room, member, isHostLeave }: { room: Room; member: Member; isHostLeave: Boolean } = result;
          const currentRoom: Room = _store.state?.room?.room;

          if (room?.roomId === currentRoom.roomId) {
            const memberSocketId = member?.socketId;
            const memberIndex = currentRoom.members.findIndex(m => m.socketId === memberSocketId);
            currentRoom.members.splice(memberIndex, 1);
          }
          break;
        }

        case ROOM_CHAT_MESSAGE: {
          const { room, chatMessage }: { room: Room; chatMessage: ChatMessage } = result;
          const currentRoom: Room = _store.state?.room?.room;
          if (room.roomId === currentRoom.roomId) {
            _store.dispatch('room/pushChatMessage', { chatMessage });
          }
          break;
        }

        case METHOD_SEND_SESSION_DESC_OFFER: {
          break;
        }
        case SESSION_DESC_OFFER: {
          const { offer, member }: { offer; member: Member } = result;
          const room: Room = _store.state?.room?.room;
          const roomMember: Member | undefined = room.members.find(m => m.socketId === member.socketId);

          if (!roomMember) return;
          const localStream = mediaManager.getLocalStream();
          roomMember.peerConnection = new PeerConnection({ member, localStream });

          await roomMember?.peerConnection?.setOffer(offer);
          const answer = await roomMember?.peerConnection?.createAnswer();
          _service.sendSessionDescAnswer({ member, answer });

          break;
        }

        case SESSION_DESC_ANSWER: {
          const { answer, member }: { answer; member: Member } = result;
          const room: Room = _store.state?.room?.room;
          const roomMember: Member | undefined = room.members.find(m => m.socketId === member.socketId);

          if (!roomMember) return;

          await roomMember?.peerConnection?.setAnswer(answer);
          break;
        }

        case ICE_CANDIDATE: {
          const { candidate, member }: { candidate; member: Member } = result;
          const room: Room = _store.state?.room?.room;
          const roomMember: Member | undefined = room.members.find(m => m.socketId === member.socketId);

          if (!roomMember) return;

          await roomMember?.peerConnection?.addIceCandidate(candidate);
          break;
        }
      }
      break;
  }
};

export default webSocketHandler;
