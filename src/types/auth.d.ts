declare interface User {
  id: string;
  email: string;
  nickname: string;
  createdDate?: string;
  token?: any;
}

declare type SignResponse = {
  user: User;
  token: string;
};
