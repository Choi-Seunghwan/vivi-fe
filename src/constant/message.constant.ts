export const MESSAGE_ROOM = {
  ROOM: 'ROOM',
  LIST: 'ROOM/LIST',
  CREATE_ROOM: 'ROOM/CREATE_ROOM',
  JOIN_ROOM: 'ROOM/JOIN_ROOM',
  LEAVE_ROOM: 'ROOM/LEAVE_ROOM',
  NEW_ROOM_MEMBER_JOINED: 'ROOM/NEW_ROOM_MEMBER_JOINED',
  ROOM_MEMBER_LEAVED: 'ROOM/ROOM_MEMBER_LEAVED',
  HOST_LEAVED: 'ROOM/HOST_LEAVED'
};

export const MESSAGE_CHAT = {
  CHAT: 'CHAT',
  SEND_ROOM_CHAT_MESSAGE: 'CHAT/SEND_ROOM_CHAT_MESSAGE',
  ROOM_CHAT_MESSAGE: 'CHAT/ROOM_CHAT_MESSAGE'
};

export const MESSAGE_PC = {
  SEND_OFFER: 'CONNECTION/SEND_OFFER',
  RECEIVE_OFFER: 'CONNECTION/RECEIVE_OFFER',
  SEND_ANSWER: 'CONNECTION/SEND_ANSWER',
  RECEIVE_ANSWER: 'CONNECTION/RECEIVE_ANSWER',
  SEND_ICE_CANDIDATE: 'CONECTION/SEND_ICE_CANDIDATE',
  RECEIVE_ICE_CANDIDATE: 'CONECTION/RECEIVE_ICE_CANDIDATE'
};
