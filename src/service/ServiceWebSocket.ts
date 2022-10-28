// import store from '@/store';
import io, { Socket } from 'socket.io-client';
import type { App as VueApp } from 'vue';
import webSocketHandler from './webSocketHandler';

class ServiceWebSocket {
  ws: Socket | undefined;
  app: VueApp | undefined;
  handlers;

  constructor(host: string) {
    this.connection(host);
  }

  setApp(app: VueApp) {
    this.app = app;
  }

  getSocketId() {
    return this.ws?.id || '';
  }

  connection(host: string) {
    this.ws = io(host);
    console.log('@@@ ws', this.ws);
    this.ws.on('replyMessage', args => {
      this.replyMessage(args);
    });

    this.ws.on('serverMessage', args => {
      this.replyMessage(args);
    });
  }

  setHandler(method, event) {
    this.handlers[method] = event;
  }

  sendMessage(method, args) {
    if (!this.ws) return false;
    this.ws.emit('message', method, args);
  }

  replyMessage(args) {
    const { method } = args;
    console.log('replyMessage', args);
    webSocketHandler.call(this, { app: this.app, method, args });
    // store.dispatch(`${splittedMethod[0]}/handleMessage`, args), { root: true };
  }
}

export default ServiceWebSocket;
