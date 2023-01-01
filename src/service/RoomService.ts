import type { App as VueApp } from 'vue';
import type API from './API';

export default class RoomService {
  app: VueApp;
  ROOM_PATH: string = import.meta.env.VITE_API_PATH_ROOM;
  api: API;

  constructor(app: VueApp, api: API) {
    this.app = app;
    this.api = api;
  }

  async getRoomList(): Promise<Room[]> {
    const result = await this.api.get(`${this.ROOM_PATH}/rooms`);
    const rooms: Room[] = result.data;
    return rooms;
  }

  // async createRoom({ title }: { title: string }) {
  // const room: Room = await this.api.post(`${this.ROOM_PATH}/create`, { title });
  // store.dispatch('room/setRoom', { room });
  }

  // async signIn({ email, password }: { email: string; password: string }): Promise<User> {
  // const user: User = await this.post(`${this.ROOM_PATH}/sign-in`, { email, password });
  // store.dispatch('room/setUser', { user });
  // return user;
  // }
}
