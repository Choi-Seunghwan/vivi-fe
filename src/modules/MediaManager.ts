import logger from '@/utils/Logger';

class MediaManager {
  localStream;

  constructor() {
    this.localStream = null;
  }

  async initLocalStream() {
    if (!navigator?.mediaDevices) return;
    try {
      this.localStream = await await navigator?.mediaDevices?.getUserMedia({ video: true });
    } catch (err) {
      logger.debug('media error');
    }
  }

  getLocalStream() {
    return this.localStream;
  }
}

const mediaManager = new MediaManager();
export default mediaManager;
