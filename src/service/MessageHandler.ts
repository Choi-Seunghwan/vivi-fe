export class MessageHandler {
  private receiveHandlers = {};

  public mappingReceiveHandlers(handlers = {}) {
    this.receiveHandlers = handlers;
  }

  public getReceiveHandlers() {
    return this.receiveHandlers;
  }
}
