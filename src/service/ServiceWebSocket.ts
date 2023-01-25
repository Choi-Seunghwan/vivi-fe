// import store from '@/store';
import io, { Socket, type SocketOptions, type ManagerOptions } from 'socket.io-client';
import store from '@/store/store';
import auth from '@/store/auth';

class ServiceWebSocket {
  ws!: Socket;
  receiveHandlers: any[] = [];

  constructor() {
    this.connection();
  }

  connection() {
    const socketHost = import.meta.env.VITE_SOCKET_ADDR;
    const token = store.getters['auth/authToken'];
    const wsOptions: Partial<ManagerOptions & SocketOptions> = {
      forceNew: true
    };

    if (token) {
      wsOptions.extraHeaders = {
        Authorization: `Bearer ${token as string}`
      };
    }

    this.ws = io(socketHost, wsOptions);
  }

  getSocketId() {
    return this.ws?.id || '';
  }

  setReceiveHandlers(handlers: {}) {
    // this.ws.on  handlers key & method
  }

  sendMessage(message, payload) {
    this.ws.emit(message, payload);
  }
}

export default ServiceWebSocket;
