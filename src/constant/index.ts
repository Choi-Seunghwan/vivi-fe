export * from './vuex';
export * from './event';

export const TYPE_RADIO = 'TYPE_RADIO';
export const TYPE_VIDEO = 'TYPE_VIDEO';

export const MAX_ROOM_MEMBER_COUNT = '4';

export const MESSAGE_ROOM = {
  ROOM: 'ROOM',
  CREATE_ROOM: 'ROOM/CREATE_ROOM'
};

export const METHOD_CREATE_ROOM = 'METHOD_CREATE_ROOM';
export const METHOD_JOIN_ROOM = 'METHOD_JOIN_ROOM';
export const METHOD_LEAVE_ROOM = 'METHOD_LEAVE_ROOM';
export const HOST_LEAVE_ROOM = 'HOST_LEAVE_ROOM';
export const MEMBER_ROOM_JOINED = 'MEMBER_ROOM_JOINED';
export const MEMBER_LEAVE_ROOM = 'MEMBER_LEAVE_ROOM';

export const METHOD_MY_ACCOUNT_INFO = 'METHOD_MY_ACCOUNT_INFO';

export const ROOM_CHAT_MESSAGE = 'ROOM_CHAT_MESSAGE';
export const METHOD_SEND_ROOM_CHAT_MESSAGE = 'METHOD_SEND_ROOM_CHAT_MESSAGE';

export const SESSION_DESC_OFFER = 'SESSION_DESC_OFFER';
export const SESSION_DESC_ANSWER = 'SESSION_DESC_ANSWER';
export const ICE_CANDIDATE = 'ICE_CANDIDATE';
export const METHOD_SEND_SESSION_DESC_OFFER = 'METHOD_SEND_SESSION_DESC_OFFER';
export const METHOD_SEND_SESSION_DESC_ANSWER = 'METHOD_SEND_SESSION_DESC_ANSWER';
export const METHOD_SEND_ICE_CANDIDATE = 'METHOD_SEND_ICE_CANDIDATE';
