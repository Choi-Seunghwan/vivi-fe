export type AckHandler = {
  key: string; // function name. ex) function.name
  handler: any;
};

export class MessageHandler {
  private receiveHandlers = {};
  private ackHandlers: AckHandler | Object = {};

  public mappingReceiveHandlers(handlers = {}) {
    this.receiveHandlers = handlers;
  }

  public getReceiveHandlers() {
    return this.receiveHandlers;
  }

  public setAckHandler(key, handler) {
    this.ackHandlers[key] = handler;
  }

  public releaseAckHandler(key) {
    delete this.ackHandlers[key];
  }

  public runAckHandler(handlerKey, args: Object = {}) {
    this.ackHandlers[handlerKey]?.(args);
  }
}
