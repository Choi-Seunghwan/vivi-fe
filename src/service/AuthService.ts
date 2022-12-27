import type { App as VueApp } from 'vue';
import store from '@/store/store';
import type API from './API';
export default class AuthService {
  app: VueApp;
  AUTH_PATH: string = import.meta.env.VITE_API_PATH_AUTH;
  api: API;

  constructor(app: VueApp, api: API) {
    this.app = app;
    this.api = api;
  }

  async signIn({ email, password }: { email: string; password: string }): Promise<User | void> {
    try {
      const result = await this.api.post(`${this.AUTH_PATH}/sign-in`, { email, password });
      const user: User = result.data;
      await store.dispatch('auth/setUser', { user });
      console.log('@@ signIn', user);
      return user;
    } catch (e) {
      console.log('@@ catch', e);
    }
  }

  async signOff() {
    await store.dispatch('auth/signOff');
  }
}
