declare interface Room {
  roomId: string;
  title: string;
  host: User;
  members: any[];
}

declare type ChatMessage = any;
