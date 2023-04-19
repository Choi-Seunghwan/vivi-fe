class EventManager {
  eventMap: Map<string, Function>;

  constructor() {
    this.eventMap = new Map<string, Function>();
  }

  setEvent(event: string, handler: Function) {
    this.eventMap.set(event, handler);
  }

  async callEvent(event, ...args) {
    const e = this.eventMap.get(event);
    if (!e && typeof e !== 'function') return;
    await e(...args);
  }

  releaseEvent(event) {
    this.eventMap.delete(event);
  }
}

const eventManager = new EventManager();

export default eventManager;
