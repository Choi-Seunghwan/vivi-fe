declare type Room = {
  roomId: string;
  title: string;
  host: RoomMember;
  members: any[];
};

declare type RoomMember = {
  id: string;
  email: string;
  nickname: string;
};
