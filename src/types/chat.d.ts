type SendChatMessage = {
  message: string;
  roomId: string;
};

type ChatMessage = {
  id: string;
  user: User;
  message: string;
  createdDate?: Date;
};
