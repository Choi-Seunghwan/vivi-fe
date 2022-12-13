import api from '@/service/api';
import type { App as VueApp } from 'vue';
import store from '@/store/store';

export default class RoomService {
  app: VueApp;
  ROOM_PATH: string = import.meta.env.VITE_API_PATH_ROOM;

  constructor(app) {
    this.app = app;
  }

  async createRoom({ title }: { title: string }) {
    const room: Room = await api.post(`${this.ROOM_PATH}/create`, { title });
    store.dispatch('room/setRoom', { room });
  }

  async signIn({ email, password }: { email: string; password: string }): Promise<User> {
    const user: User = await api.post(`${this.ROOM_PATH}/sign-in`, { email, password });
    // store.dispatch('room/setUser', { user });
    return user;
  }
}
