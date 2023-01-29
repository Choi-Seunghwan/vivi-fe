declare interface User {
  id: string;
  email: string;
  nickname: string;
  createdDate?: string;
}

declare type SignResponse = {
  user: User;
  token: string;
};

declare type Member = any;
