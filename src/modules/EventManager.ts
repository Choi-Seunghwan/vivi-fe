class EventManager {
  eventMap = {};

  constructor() {
    this.eventMap = {};
  }

  setEvent(event, handler) {
    this.eventMap[event] = handler;
  }

  async callEvent(event, ...args) {
    const e = this.eventMap[event];
    if (!e && typeof e !== 'function') return;
    await e(...args);
  }
}

export default new EventManager();
