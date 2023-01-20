import type { App as VueApp } from 'vue';
import store from '@/store/store';
import type API from './API';
import { setAuthTokenFromLocalStorage, getAuthTokenFromLocalStorage, removeAuthTokenLocalStorage } from '@/common/auth';
export default class AuthService {
  app: VueApp;
  AUTH_PATH: string = import.meta.env.VITE_API_PATH_AUTH;
  api: API;

  constructor(app: VueApp, api: API) {
    this.app = app;
    this.api = api;

    this.autoSignIn();
  }

  async autoSignIn() {
    const token = getAuthTokenFromLocalStorage();
    if (token) {
      await store.dispatch('auth/setAuthToken', { token });
      await this.tokenSignIn();
    }
  }

  async tokenSignIn() {
    try {
      const user: User = await this.api.post(`${this.AUTH_PATH}/token-sign-in`, {});
      await store.dispatch('auth/setUser', { user });

      return user;
    } catch (e) {
      throw e;
    }
  }

  async signIn({
    email,
    password,
    isSave = false
  }: {
    email: string;
    password: string;
    isSave?: boolean;
  }): Promise<User | void> {
    try {
      const user: User = await this.api.post(`${this.AUTH_PATH}/sign-in`, { email, password });
      await store.dispatch('auth/setUser', { user });

      if (isSave) setAuthTokenFromLocalStorage(user.token);

      return user;
    } catch (e) {
      throw e;
    }
  }

  async signOff() {
    removeAuthTokenLocalStorage();
    await store.dispatch('auth/signOff');
  }
}
