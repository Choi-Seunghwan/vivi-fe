import api from '@/service/api';
import type { App as VueApp } from 'vue';

export default class AuthService {
  app: VueApp;
  AUTH_PATH: string = import.meta.env.VITE_API_PATH_AUTH;

  constructor(app) {
    console.log(import.meta.env.VITE_API_PATH_AUTH);
    this.app = app;
  }

  async signIn({ email, password }: { email: string; password: string }) {
    const result = await api.post(`${this.AUTH_PATH}/sign-in`, { email, password });
    return result;
  }
}
