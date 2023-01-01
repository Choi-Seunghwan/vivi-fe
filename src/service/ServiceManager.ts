import type { Store } from 'vuex';
import type { App as VueApp } from 'vue';
import API from './API';
import AuthService from './AuthService';
import RoomService from './RoomService';

export default class ServiceManager {
  app: VueApp;
  store: Store<any>;
  authService: AuthService;
  roomService: RoomService;
  api: API;

  constructor(app: VueApp, store: Store<any>) {
    this.app = app;
    this.store = store;
    this.api = new API();

    this.authService = new AuthService(app, this.api);
    this.roomService = new RoomService(app, this.api);
  }
}
