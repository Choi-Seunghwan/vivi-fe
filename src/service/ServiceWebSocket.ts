// import store from '@/store';
import io, { Socket } from 'socket.io-client';
import webSocketHandler from './webSocketHandler';

class ServiceWebSocket {
  ws: Socket | undefined;
  app;
  connectionStatus;
  connectionStatuses;
  handlers;

  constructor() {
    this.connectionStatus = 1;
    this.connectionStatuses = {
      IDLE: 1,
      CONNECTING: 2,
      CONNECTED: 3,
      DISCONNECTED: 4,
      WAITING: 5
    };
    this.wsInit();
  }

  setApp(app) {
    this.app = app;
  }

  wsInit() {
    this.connection();
  }

  getSocketId() {
    return this.ws?.id;
  }

  connection() {
    this.ws = io('localhost:3080');
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
