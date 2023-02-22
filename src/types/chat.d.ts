type SendChatMessage = {
  message: string;
  roomId: string;
};

type CHAT_MESSAGE_TYPE = 'NORMAL' | 'SYSTEM';

type ChatMessage = {
  id: string;
  user: User;
  message: string;
  createdDate?: Date;
  type: CHAT_MESSAGE_TYPE;
};
