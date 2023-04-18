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
  socketId: string;
};

interface CreateRoomResult extends Room, WsError {}
interface JoinRoomResult extends Room, WsError {}
