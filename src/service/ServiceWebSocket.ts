// import store from '@/store';
import io, { Socket } from 'socket.io-client';

class ServiceWebSocket {
  ws: Socket;
  receiveHandlers: any[] = [];

  constructor() {
    const socketHost = import.meta.env.VITE_SOCKET_ADDR;
    this.ws = io(socketHost);
  }

  getSocketId() {
    return this.ws?.id || '';
  }

  setReceiveHandlers(handlers: {}) {
    // this.ws.on  handlers key & method
  }
}

export default ServiceWebSocket;
