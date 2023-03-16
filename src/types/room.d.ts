declare type Room = {
  roomId: string;
  title: string;
  host: User;
  members: any[];
};

declare type RoomMember = {
  id: string;
  email: string;
  nickname: string;
};
