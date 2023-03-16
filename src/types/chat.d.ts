export type SendChatMessage = {
  message: string;
  roomId: string;
};

export type CHAT_MESSAGE_TYPE = 'NORMAL' | 'SYSTEM';

export type MessageInfo = {
  message: string;
  nickname?: string;
};

export type ChatMessage = {
  id: string;
  user: User;
  messageInfo: MessageInfo;
  createdDate?: Date;
  type: CHAT_MESSAGE_TYPE;
};
