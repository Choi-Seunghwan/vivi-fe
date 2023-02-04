import type { App as VueApp } from 'vue';
import logger from '@/utils/Logger';

export default class MediaManager {
  localStream: MediaStream | null;
  app: VueApp;

  constructor(app: VueApp) {
    this.app = app;
    this.localStream = null;
  }

  async initLocalStream(): Promise<MediaStream | void> {
    try {
      if (!navigator?.mediaDevices) return;
      else return await navigator?.mediaDevices?.getUserMedia({ video: true, audio: true });
    } catch (err) {
      logger.debug('initLocalStream Error');
    }
  }

  clearlocalStream() {
    this.localStream = null;
  }

  getLocalStream(): MediaStream | null {
    return this.localStream;
  }
}
